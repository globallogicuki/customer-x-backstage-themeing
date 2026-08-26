import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles(theme => {
  // Brand-deep surface and accent come from the navigation palette so the
  // banner follows whichever theme is active (navy/cyan for CustomerX).
  const deep = theme.palette.navigation.background;
  const accent = theme.palette.navigation.indicator;
  return {
    root: {
      position: 'relative',
      overflow: 'hidden',
      padding: '56px 40px 64px',
      color: theme.palette.navigation.selectedColor,
      background: `linear-gradient(135deg, ${deep} 0%, ${
        theme.palette.navigation.submenu?.background ?? deep
      } 100%)`,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
      },
      '&::before': {
        right: -160,
        top: -220,
        width: 620,
        height: 620,
        background: `radial-gradient(closest-side, ${accent}73, ${accent}00 70%)`,
      },
      '&::after': {
        left: -120,
        bottom: -260,
        width: 520,
        height: 520,
        background: `radial-gradient(closest-side, ${accent}38, ${accent}00 70%)`,
      },
      [theme.breakpoints.down('sm')]: { padding: '40px 24px 56px' },
    },
    inner: {
      position: 'relative',
      maxWidth: 1180,
      margin: '0 auto',
    },
    eyebrow: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: theme.palette.secondary.light,
      marginBottom: 14,
    },
    title: {
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: { fontSize: 32 },
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 1.55,
      opacity: 0.76,
      maxWidth: 620,
      marginBottom: 28,
    },
  };
});

export interface HeroBannerProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Content below the copy — a search bar, actions, chips. */
  children?: ReactNode;
  className?: string;
}

/** Full-bleed brand banner for landing/overview pages. */
export const HeroBanner = ({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: HeroBannerProps) => {
  const classes = useStyles();
  return (
    <section className={[classes.root, className].filter(Boolean).join(' ')}>
      <div className={classes.inner}>
        {eyebrow && <div className={classes.eyebrow}>{eyebrow}</div>}
        <Typography component="h1" className={classes.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        )}
        {children}
      </div>
    </section>
  );
};
