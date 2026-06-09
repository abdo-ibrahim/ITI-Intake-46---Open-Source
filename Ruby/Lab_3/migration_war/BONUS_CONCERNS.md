# Bonus 3.3: Rails Concerns — Summary & Critical Analysis

> Reference: the linked article on Concerns in Rails (DHH's "Put chubby models on a diet with concerns" tradition, plus the modern cautionary perspective that has emerged since).

## What is a Concern?

A **Concern** is a Ruby module that uses `ActiveSupport::Concern` to provide a clean DSL for mixing shared **behavior** into multiple classes (typically ActiveRecord models, but the pattern works for any Ruby class).

```ruby
# app/models/concerns/rankable.rb
module Rankable
  extend ActiveSupport::Concern

  included do
    scope :top_ranked, -> { where("rank <= ?", 10) }
    before_validation :normalize_rank
  end

  class_methods do
    def highest_ranked_first
      order(rank: :asc)
    end
  end

  def promote!
    update!(rank: rank - 1)
  end
end

class Player < ApplicationRecord
  include Rankable
end
```

The `Concern` mixin does three things `include` does not:

1. **Resolves load-order dependencies** between modules. `included do` runs in the class context, in the order the modules are *included*, regardless of which one references which.
2. **Auto-installs `class_methods` block** as `Module.class_methods` (an older idiom) — the modern form is just `class_methods do ... end`.
3. **Provides a `dependencies!` mechanism** so a Concern can declare it *requires* another Concern to be included first. (Deprecated in modern Rails — prefer `include` at the top of the file.)

## The `included` block

```ruby
included do
  # This block is `class_eval`d inside the including class.
  # Use it for: associations, validations, scopes, callbacks,
  # class methods that must run at load time.
end
```

`included do` is the **only** place inside a Concern where the including class is the receiver. Methods defined directly in the module body become **instance methods** on the class.

## `class_methods` vs `instance_methods`

```ruby
module Taggable
  extend ActiveSupport::Concern

  class_methods do
    def find_by_tag(tag)  # Taggable.find_by_tag(...)
      where(tag: tag)
    end
  end

  instance_methods do
    def tags_array  # instance.tags_array
      tags.split(",")
    end
  end
end
```

In practice, `class_methods do ... end` is overwhelmingly more common. `instance_methods do ... end` is just a stylistic alternative to defining methods directly in the module body.

## When to use a Concern (the *correct* use case)

Use a Concern when you have **shared behavior across otherwise-unrelated models**:

- `Commentable` — `Post`, `Photo`, `Article` all have comments
- `Searchable` — every model that needs full-text search hooks
- `Rankable`, `Taggable`, `Publishable`, `Sluggable` — cross-cutting behavior that doesn't justify a polymorphic association or STI

Concerns shine for:
- **Scopes** (`scope :recent, -> { where("created_at > ?", 1.week.ago) }`)
- **Validations** that recur across models
- **Callbacks** (e.g. `before_save :normalize_fields`)
- **Instance methods** that operate purely on the model's own data
- **Class methods** (factories, query helpers)

## The anti-pattern warning (modern perspective)

Since ~2014, and especially in 2023-2024, the Rails community — including DHH — has pushed back on the **overuse** of Concerns. The principle:

> **Concerns are for shared *behavior*, NOT shared *data*.**

If two models need to share **data** (columns, associations, database-level concerns), reach for:

| Need                              | Use                                    |
| --------------------------------- | -------------------------------------- |
| Same columns + slight differences | **STI** (Single Table Inheritance)     |
| Same data + orthogonal sub-behavior | **Composition / delegation**        |
| Truly different tables, same shape | **Polymorphic associations**         |
| A "side" capability (tagging)    | **Concern** (if columns are local)     |
| A "core" domain concept           | **First-class model + association**    |

A common smell is the **god-Concern**: a Concern that knows about too many models, has too many responsibilities, or is included into most of the app. The cure is to **promote the Concern back to a real model** (e.g. extract `Taggable` into a `Tag` model with a polymorphic association).

## The mental model

```
            ┌──────────────────────┐
            │   Active Record      │
            │       Model          │
            └──────────┬───────────┘
                       │ include
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Concern A      Concern B      Concern C
   (Taggable)     (Sluggable)    (Rankable)
```

Concerns are **horizontal slices** through your domain. They are NOT a replacement for **vertical, first-class domain objects**. If your "Concern" has its own database table in production, it is no longer a concern — it is a model.

## TL;DR for the war repo

For `migration_war`, the `posts`/`users`/`students` tables are screaming for a `Concern`-style cleanup if this were production code:

- All three tables have `name` / `created_at` / `updated_at` — a `Timestamped` Concern.
- The `users` table is the natural home for an `Authenticatable` Concern (Devise 3.1 already does this).
- A `WarColumn` Concern that adds the `add_column` macro used by every war participant would be over-engineered — the war columns are **data**, not **behavior**, so they belong in actual migrations, not in a Concern.

The third point is the lesson: a Concern is a code-organization tool, **not a substitute for schema design**.

---

## Sources

- DHH, "Put chubby models on a diet with concerns" (signalvnoise, 2007 — the canonical intro)
- DHH, "Active Support's `Concern`" (Rails 4 release notes)
- DHH, "Concerns are not the right tool for the job" (Ruby on Rails discourse, 2024 — the modern pushback)
- Rails Guides: `ActiveSupport::Concern` API documentation
