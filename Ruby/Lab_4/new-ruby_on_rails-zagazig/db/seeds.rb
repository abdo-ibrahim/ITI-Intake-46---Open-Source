PostEditor.destroy_all
Post.destroy_all
Editor.destroy_all
User.destroy_all

user1 = User.create!(name: "Abdo Ibrahim", email: "abdo@example.com")
user2 = User.create!(name: "Ahmed Ali", email: "ahmed@example.com")

editor1 = Editor.create!(name: "Sami Kamel")
editor2 = Editor.create!(name: "Youssef Omar")

post1 = Post.create!(title: "First Architecture Post", content: "Exploring Rails MVC...", creator: user1)
post2 = Post.create!(title: "Advanced API Guide", content: "Deep dive into Rails API mode", creator: user2)

post1.editors << [editor1, editor2]
post2.editors << [editor1]

puts "Seeds created successfully! Created #{User.count} users, #{Post.count} posts, and #{Editor.count} editors."