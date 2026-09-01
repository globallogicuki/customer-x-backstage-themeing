import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { font } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '32px 32px 24px',
    [theme.breakpoints.down('sm')]: { padding: '24px 20px 20px' },
  },
  inner: { maxWidth: 1200, margin: '0 auto' },
  eyebrow: {
    fontSize: font.base,
    fontWeight: 500,
    color: tokensFor(theme).accentText,
    marginBottom: 4,
  },
  title: {
    fontSize: font.display,
    fontWeight: 600,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
    color: tokensFor(theme).heading,
    [theme.breakpoints.down('sm')]: { fontSize: 24 },
  },
  subtitle: {
    fontSize: font.md,
    lineHeight: 1.55,
    color: theme.palette.text.secondary,
    maxWidth: 640,
    marginTop: 8,
  },
  children: { marginTop: 24 },
}));

export interface PageIntroProps {
  /** A line of context above the title — where the reader is, not a slogan. */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Content below the copy — a search bar, actions, filters. */
  children?: ReactNode;
  className?: string;
}

/**
 * The opening block of a full-page surface: eyebrow, title, optional line of
 * detail, then whatever the page starts with.
 *
 * It sits on the app background with no fill of its own. Inside a signed-in
 * tool the page a person lands on twenty times a day is a working surface,
 * not a campaign: the dark brand panel belongs on sign-in, where it is
 * someone's first impression, and nowhere else.
 */
export const PageIntro = ({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: PageIntroProps) => {
  const classes = useStyles();
  return (
    <section className={cx(classes.root, className)}>
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
