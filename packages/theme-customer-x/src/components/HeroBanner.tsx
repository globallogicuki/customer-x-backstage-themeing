import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { CustomerXMark } from '../brand';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { brand, font, rgba } from '../tokens';

const useStyles = makeStyles(theme => {
  const { nav } = tokensFor(theme);
  return {
    // Flat Dark Blue, same as the sign-in panel and the rail. The depth comes
    // from the brand mark itself — drawn far larger than life and cropped by
    // the banner — not from a gradient that could belong to any product.
    root: {
      position: 'relative',
      overflow: 'hidden',
      padding: '48px 32px 72px',
      color: brand.white,
      backgroundColor: nav.background,
      [theme.breakpoints.down('sm')]: { padding: '36px 20px 64px' },
    },
    // Cropped by the banner's bottom edge only, so the head is always in view
    // — atmosphere, not an accidental slice of wing.
    watermark: {
      position: 'absolute',
      right: '2%',
      top: '-12%',
      opacity: 0.1,
      pointerEvents: 'none',
      userSelect: 'none',
      [theme.breakpoints.down('sm')]: { right: '-24%' },
    },
    // 1136 = the landing page's 1200px content column minus its 32px side
    // padding, so the hero copy shares a left edge with the cards below it.
    inner: {
      position: 'relative',
      maxWidth: 1136,
      margin: '0 auto',
      animation: '$rise 320ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
    },
    // The page's one piece of choreography: the copy settles, then (see
    // LandingPage) the tiles follow a beat later. Everything else is static.
    // The global reduced-motion rule zeroes this for anyone who has asked.
    '@keyframes rise': {
      from: { opacity: 0, transform: 'translateY(8px)' },
      to: { opacity: 1, transform: 'none' },
    },
    eyebrow: {
      fontSize: font.base,
      fontWeight: 500,
      color: brand.cyanLight,
      marginBottom: 8,
    },
    title: {
      fontSize: 36,
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
      [theme.breakpoints.down('sm')]: { fontSize: font.xxl },
    },
    subtitle: {
      fontSize: font.lg,
      lineHeight: 1.55,
      color: rgba(brand.white, 0.72),
      maxWidth: 600,
      marginTop: 8,
    },
    children: { marginTop: 28 },
  };
});

export interface HeroBannerProps {
  /** A line of context above the title — where the reader is, not a slogan. */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Content below the copy — a search bar, actions, chips. */
  children?: ReactNode;
  className?: string;
}

/**
 * Full-bleed brand banner for the landing page: the navy, the mark cropped
 * through it, the greeting, and whatever the page starts with. Pages that
 * need a quieter opening use `PageIntro`.
 */
export const HeroBanner = ({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: HeroBannerProps) => {
  const classes = useStyles();
  return (
    <section className={cx(classes.root, className)}>
      <div className={classes.watermark} aria-hidden="true">
        <CustomerXMark size={520} color={brand.cyan} />
      </div>
      <div className={classes.inner}>
        {eyebrow && <div className={classes.eyebrow}>{eyebrow}</div>}
        <Typography component="h1" className={classes.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        )}
        {children && <div className={classes.children}>{children}</div>}
      </div>
    </section>
  );
};
