# Components

Use these before reaching for raw MUI. They are exported from
`@globallogicuki/backstage-theme-customer-x`.

| Primitive | Use it for |
| --- | --- |
| `SurfaceCard` | Any card. `interactive` for whole-card links, `accentHover` for the cyan border |
| `StatTile` | A labelled figure with an icon on the accent wash. `tone="warning"` for counts that should be zero; `hint` for one line of context |
| `ActionCard` | "Do this next": icon, title, one line |
| `PanelCard` + `ListRow` | A titled list with an optional header action |
| `Pill` | A small status/type label — sentence case, five tones |
| `SectionHeading` | Breaks a dashboard page into sections |
| `HeroBanner` / `PageIntro` | A page's opening: full-bleed Dark Blue with the mark, or a quiet heading |
| `Skeleton` | Stand-in while a value loads. Never show a dash |
| `StatePanel` | Empty and error states: icon, one sentence, one action |

## Rules of thumb

- **Every figure has a skeleton.** Layout must not move when data arrives.
- **Every empty state is an invitation.** Say what would fill it and give the
  one action that does.
- **Cards don't move on hover.** Border firms up, fill warms.
- **Icons are Material *Rounded*.** Sharp or Outlined variants are not mixed in.
