# VeriStream Project Context

## Product

VeriStream is a platform for autonomous AI agent payments. Agents can discover
services, request tasks, pay through blockchain-backed escrow, stream payments,
and verify completed work.

**Tagline:** Pay as agents work. Trust what agents deliver.

## Foundation and architecture

- Next.js App Router, React, TypeScript, and Tailwind CSS.
- Application routes and global styles live in `src/app`.
- Reusable presentation components live in `src/components`.
- Product-specific functionality belongs in `src/features`.
- API and backend communication belongs in `src/services`, not UI components.
- Authentication and wallet access stay behind service interfaces. Until a real
  provider and backend are configured, keep these flows disconnected and show
  explicit unavailable states rather than reporting successful operations.
- Shared hooks, types, and utilities belong in `src/hooks`, `src/types`, and
  `src/lib`.
- Development fixtures belong in `src/mocks`; do not present invented data as
  production metrics or backend responses.
- Static assets belong in `public/assets`.

## Development rules

- Keep components reusable, focused, responsive, and reasonably small.
- Use TypeScript types and explicit loading, empty, and error states where
  appropriate; avoid unnecessary `any`.
- Keep financial calculations and blockchain authorization out of presentation
  components.
- Never expose secrets or private wallet keys.
- Never ask for or persist seed phrases, private keys, or passwords; connecting
  a wallet does not authenticate a user or authorize a signature.
- Keep the visual language enterprise-focused: deep navy, restrained blue and
  cyan, thin borders, clear hierarchy, and generous whitespace.
- Avoid excessive glass effects, neon, gradients, animation, nesting, and
  decoration.
- Do not add a backend contract, financial metric, or blockchain behavior until
  it is defined and supported by the product requirements.
