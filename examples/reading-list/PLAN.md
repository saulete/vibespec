# Plan: Batch 1 — Listas y libros

## Tasks
- [ ] Task 1: Create reading_lists table and schema → SC-01
  - Test: test_create_list_persists_to_database (create list, query DB, assert row exists)
  - Files: src/db/schema.ts, src/__tests__/db/lists.test.ts

- [ ] Task 2: Create list visibility enum and validation → SC-01
  - Test: test_list_visibility_must_be_public_or_private (reject invalid visibility values)
  - Files: src/db/schema.ts, src/__tests__/db/lists.test.ts

- [ ] Task 3: Create POST /api/lists endpoint → SC-01
  - Test: test_post_lists_creates_and_returns_list (POST with name + visibility, assert 201 + body matches)
  - Files: src/app/api/lists/route.ts, src/__tests__/api/lists.test.ts

- [ ] Task 4: Create list display in dashboard → SC-01
  - Test: test_dashboard_shows_created_lists (render dashboard, assert list name visible)
  - Files: src/app/dashboard/page.tsx, src/__tests__/dashboard.test.tsx

- [ ] Task 5: Create books table and search endpoint → SC-02
  - Test: test_search_books_returns_results_in_under_300ms (seed 100 books, search 3+ chars, assert response time + relevance)
  - Files: src/db/schema.ts, src/app/api/books/search/route.ts, src/__tests__/api/books-search.test.ts

- [ ] Task 6: Create POST /api/lists/[id]/books endpoint → SC-02
  - Test: test_add_book_to_list (POST book to list, assert 200 + book appears in list)
  - Files: src/app/api/lists/[id]/books/route.ts, src/__tests__/api/list-books.test.ts

- [ ] Task 7: Integration test — create list, add books, verify dashboard → SC-01, SC-02
  - Test: test_full_flow_create_list_add_books (create list, add 3 books, assert all visible in dashboard)
  - Files: src/__tests__/integration/lists-flow.test.ts