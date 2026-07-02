#!/usr/bin/env bash
# Run this script while the server is running: npm start
# Usage: bash test.sh

BASE="http://localhost:3000"
PASS=0
FAIL=0

check() {
  local label="$1"
  local expected="$2"
  local actual="$3"
  if echo "$actual" | grep -q "$expected"; then
    echo "  PASS  $label"
    ((PASS++))
  else
    echo "  FAIL  $label"
    echo "        expected to contain: $expected"
    echo "        got: $actual"
    ((FAIL++))
  fi
}

echo ""
echo "=== AUTHORS ==="

R=$(curl -s "$BASE/authors")
check "GET /authors returns array"        '"id"'           "$R"

R=$(curl -s "$BASE/authors/1")
check "GET /authors/1 returns Orwell"     "Orwell"         "$R"

R=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/authors/999")
check "GET /authors/999 returns 404"      "404"            "$R"

R=$(curl -s -X POST "$BASE/authors" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ursula K. Le Guin","bio":"American author."}')
check "POST /authors creates author"      "Le Guin"        "$R"
NEW_AUTHOR_ID=$(echo "$R" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

R=$(curl -s -X PATCH "$BASE/authors/$NEW_AUTHOR_ID" \
  -H "Content-Type: application/json" \
  -d '{"bio":"Updated bio."}')
check "PATCH /authors/:id updates bio"    "Updated bio"    "$R"

R=$(curl -s "$BASE/authors/2/books")
check "GET /authors/2/books (Rowling)"    "Harry Potter"   "$R"

R=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/authors/$NEW_AUTHOR_ID")
check "DELETE /authors/:id returns 204"   "204"            "$R"

echo ""
echo "=== BOOKS ==="

R=$(curl -s "$BASE/books")
check "GET /books returns array"          '"id"'           "$R"

R=$(curl -s "$BASE/books?author_id=1")
check "GET /books?author_id=1 (Orwell)"   "Orwell"         "$R"

R=$(curl -s "$BASE/books/1")
check "GET /books/1 includes author"      '"author"'       "$R"

R=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/books/999")
check "GET /books/999 returns 404"        "404"            "$R"

R=$(curl -s -X POST "$BASE/books" \
  -H "Content-Type: application/json" \
  -d '{"title":"The Left Hand of Darkness","year":1969,"author_id":1}')
check "POST /books creates book"          "Left Hand"      "$R"
NEW_BOOK_ID=$(echo "$R" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

R=$(curl -s -X PATCH "$BASE/books/$NEW_BOOK_ID" \
  -H "Content-Type: application/json" \
  -d '{"year":1970}')
check "PATCH /books/:id updates year"     "1970"           "$R"

R=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/books/$NEW_BOOK_ID")
check "DELETE /books/:id returns 204"     "204"            "$R"

echo ""
echo "=== LOANS ==="

R=$(curl -s "$BASE/loans")
check "GET /loans returns array"          '"id"'           "$R"

R=$(curl -s "$BASE/loans?returned=false")
check "GET /loans?returned=false"         '"id"'           "$R"

R=$(curl -s "$BASE/loans/1")
check "GET /loans/1 includes book"        '"book"'         "$R"

R=$(curl -s -X POST "$BASE/loans" \
  -H "Content-Type: application/json" \
  -d '{"book_id":5,"borrower_name":"Carol White"}')
check "POST /loans checks out book 5"     "Carol White"    "$R"
NEW_LOAN_ID=$(echo "$R" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/loans" \
  -H "Content-Type: application/json" \
  -d '{"book_id":5,"borrower_name":"Dave Brown"}')
check "POST /loans duplicate returns 409" "409"            "$R"

R=$(curl -s -X PATCH "$BASE/loans/$NEW_LOAN_ID/return")
check "PATCH /loans/:id/return sets date" "returned_at"   "$R"

R=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$BASE/loans/$NEW_LOAN_ID/return")
check "PATCH /loans/:id/return again 409" "409"            "$R"

echo ""
echo "=== RESULTS: $PASS passed, $FAIL failed ==="
echo ""
