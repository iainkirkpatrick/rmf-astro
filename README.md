# RMF

### Notes:
- viewing properties (list and single view), and searching over properties public atm (given the auth barrier is free-for-all signup, the data is essentially public anyway)
- SSR all pages for now to allow for auth state / session checking:
  - possible client-side auth checking would be slightly more efficient for those pages where auth state isn't crucial (i.e. property searching)?