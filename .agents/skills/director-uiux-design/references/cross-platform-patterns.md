# Cross-Platform Design Patterns

## Responsive Web Breakpoints

### Standard Breakpoints
| Name | Width | Target Devices |
|------|-------|----------------|
| Mobile S | 320px | Older iPhones, small Android |
| Mobile M | 375px | iPhone 12/13/14, modern Android |
| Mobile L | 428px | iPhone Pro Max, large Android |
| Tablet | 768px | iPad Mini, tablets portrait |
| Tablet L | 1024px | iPad Pro, tablets landscape |
| Desktop | 1280px | Laptops, small monitors |
| Desktop L | 1440px | Standard monitors |
| Desktop XL | 1920px+ | Large monitors, 4K |

### Responsive Strategies

**Mobile-First**
- Start with smallest breakpoint, enhance upward
- Forces prioritization of essential content
- Better performance on constrained devices

**Desktop-First**
- Start with full experience, adapt downward
- Risk of "cramming" on mobile
- Use when desktop is primary audience

**Component-Based**
- Components respond to container, not viewport
- More flexible, reusable
- Requires CSS container queries or JS

---

## iOS Design Patterns

### Navigation
- **Tab Bar**: Primary navigation (max 5 items)
- **Navigation Bar**: Hierarchical drill-down with back button
- **Modal**: Interrupting flows, confirmations

### Key Components
- **Action Sheets**: Bottom-anchored options
- **Alerts**: Centered, critical decisions
- **Popovers**: Contextual info (iPad)
- **Sheets**: Partial-screen overlays

### Gestures
| Gesture | Action |
|---------|--------|
| Tap | Primary selection |
| Long press | Context menu |
| Swipe horizontal | List actions, navigation |
| Swipe down | Dismiss, refresh |
| Pinch | Zoom |
| Edge swipe | Back navigation |

### Typography (SF Pro)
- Large Title: 34pt
- Title 1: 28pt
- Title 2: 22pt
- Title 3: 20pt
- Body: 17pt
- Caption: 12pt

---

## Android Design Patterns (Material 3)

### Navigation
- **Navigation Bar**: Bottom, 3-5 destinations
- **Navigation Rail**: Side, tablets/desktop
- **Navigation Drawer**: Full menu, secondary nav
- **Top App Bar**: Title, actions, navigation icon

### Key Components
- **Bottom Sheets**: Expanding content panels
- **Dialogs**: Centered decisions
- **Snackbars**: Brief feedback messages
- **FAB**: Primary action button

### Gestures
| Gesture | Action |
|---------|--------|
| Tap | Selection, activation |
| Long press | Multi-select, context |
| Swipe | Dismiss, actions |
| Drag | Reorder, move |
| Fling | Scroll momentum |

### Typography (Roboto)
- Display Large: 57sp
- Headline Large: 32sp
- Title Large: 22sp
- Body Large: 16sp
- Label Large: 14sp
- Body Small: 12sp

---

## iOS vs Android Comparison

| Pattern | iOS | Android |
|---------|-----|---------|
| Primary nav | Tab bar (bottom) | Navigation bar (bottom) |
| Back action | Edge swipe, nav bar | System back, nav icon |
| Selection | Checkmarks | Checkboxes |
| Toggles | Switch (green) | Switch (themed) |
| Actions | Action sheets | Bottom sheets |
| Alerts | Centered, stacked buttons | Centered, side-by-side |
| Search | In nav bar | Expandable in top bar |
| Date picker | Spinner wheels | Calendar view |

---

## Marketplace-Specific Patterns

### Search & Discovery

**Search Bar Placement**
- Persistent: Always visible (Amazon model)
- Collapsible: Appears on scroll/tap (Airbnb model)
- Centered: Home page focus (Google model)

**Filter Patterns**
- Filter bar: Horizontal chips for quick filters
- Filter drawer: Slide-out panel for complex filters
- Filter page: Full-screen for many options

**Results Display**
- Grid: Visual products (clothing, home goods)
- List: Information-dense (services, B2B)
- Map: Location-based (real estate, travel)

### Product Display Page (PDP)

**Essential Elements**
1. Image gallery (swipeable, zoomable)
2. Title and key attributes
3. Price and availability
4. Add to cart CTA
5. Seller information
6. Reviews and ratings
7. Related products

**Trust Elements**
- Seller verification badge
- Return policy clarity
- Secure payment icons
- Buyer protection guarantee

### Checkout Optimization

**Best Practices**
- Progress indicator (steps remaining)
- Guest checkout option
- Saved payment methods
- Address autocomplete
- Order summary always visible
- Trust badges near payment
- Clear error messaging

**Conversion Killers**
- Required account creation
- Hidden fees until final step
- Confusing form fields
- No mobile payment options
- Slow page loads

### Two-Sided Marketplace Balance

**Seller Tools**
- Easy listing creation
- Inventory management dashboard
- Performance analytics
- Customer communication
- Payout visibility

**Buyer Tools**
- Personalized recommendations
- Price comparison
- Saved searches and alerts
- Order tracking
- Easy returns/disputes

---

## Accessibility Essentials

### WCAG 2.1 AA Requirements

**Perceivable**
- Color contrast: 4.5:1 normal text, 3:1 large text
- Text alternatives for images
- Captions for video
- Responsive without loss of info

**Operable**
- Keyboard navigable
- No seizure-inducing content
- Skip navigation links
- Descriptive link text

**Understandable**
- Readable content (plain language)
- Predictable behavior
- Error prevention and recovery

**Robust**
- Valid HTML
- ARIA landmarks and labels
- Compatible with assistive tech

### Platform-Specific A11y

**iOS**
- VoiceOver support
- Dynamic Type scaling
- Reduce Motion preference
- High contrast mode

**Android**
- TalkBack support
- Font scaling
- Color inversion
- Switch Access

**Web**
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Focus management
- ARIA live regions

---

## Performance Guidelines

### Core Web Vitals Targets
| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤2.5s | 2.5-4s | >4s |
| FID | ≤100ms | 100-300ms | >300ms |
| CLS | ≤0.1 | 0.1-0.25 | >0.25 |

### Mobile App Performance
- App launch: <2 seconds cold start
- Screen transitions: <300ms
- Touch response: <100ms feedback
- Scroll: 60fps smooth

### Design Decisions That Impact Performance
- Image formats and sizing
- Animation complexity
- Font loading strategy
- Above-the-fold content priority
- Lazy loading implementation
