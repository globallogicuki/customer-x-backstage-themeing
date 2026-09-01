import { SearchModal, type SearchModalProps } from '@backstage/plugin-search';
import { CommandPalette } from './CommandPalette';

export type CustomerXSearchModalProps = Omit<SearchModalProps, 'children'>;

/**
 * Backstage's `SearchModal` (which owns the dialog, the search context and the
 * ⌘K state) with the portal's command palette rendered inside it. The dialog's
 * own shape is corrected in `globalCss.ts` via `.MuiDialog-paper:has([data-cx-palette])`.
 */
export const CustomerXSearchModal = (props: CustomerXSearchModalProps) => (
  <SearchModal {...props}>
    {({ toggleModal }) => <CommandPalette toggleModal={toggleModal} />}
  </SearchModal>
);
