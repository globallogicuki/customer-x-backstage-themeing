/* eslint-disable @typescript-eslint/no-explicit-any */
import { font } from '../../../tokens';
import type { ModeTokens } from '../../modes';
import { hairline } from '../shared';

/** Tables: quiet zebra-free rows, sentence-case headers. */
export function tableComponents(t: ModeTokens) {
  const { n } = t;
  const border = hairline(t);

  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': { backgroundColor: 'transparent' },
          '&:last-child td': { borderBottom: 0 },
        },
        hover: {
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: `${t.hoverOverlay} !important`,
          },
        },
        head: {
          '&:nth-of-type(odd)': { backgroundColor: 'transparent' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // `word-break: break-word` (Backstage's default) lets a column shrink
          // below its longest word and then split it ("exampl / e-service").
          // `overflow-wrap: break-word` sizes columns to the longest word and
          // only breaks a word that could never fit — so names stay whole.
          // (Not `anywhere`: that shrinks columns to single letters.)
          wordBreak: 'normal',
          overflowWrap: 'break-word',
          overflow: 'hidden',
          verticalAlign: 'middle',
          lineHeight: 1.4,
          fontSize: font.md,
          margin: 0,
          padding: '14px 16px 14px 20px',
          borderBottom: border,
        },
        sizeSmall: {
          padding: '10px 16px 10px 20px',
        },
        head: {
          // Column names never wrap; a header that reads "Descrip / tion" is
          // worse than a wider column.
          whiteSpace: 'nowrap',
          wordBreak: 'normal',
          overflow: 'hidden',
          color: n.textSecondary,
          fontWeight: 500,
          fontSize: font.sm,
          lineHeight: 1.2,
          backgroundColor: n.paperMuted,
          borderBottom: border,
        },
        footer: {
          borderBottom: 0,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { fontSize: font.base, color: n.textSecondary },
        toolbar: { minHeight: 52 },
      },
    },
  };
}
