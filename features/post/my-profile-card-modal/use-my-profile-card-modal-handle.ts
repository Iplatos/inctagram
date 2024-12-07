import { useCallback, useEffect, useState } from 'react';

import { createNextState as produceByImmer } from '@reduxjs/toolkit';

type ModalState = {
  cancelEditModalOpen: boolean;
  confirmDeleteModalOpen: boolean;
  description: string;
  isAttemptingToClose: boolean;
  isEditing: boolean;
  isFormFocused: boolean;
};

type Parameters = {
  initialDescription?: string;
  onClose: () => void;
  onDeletePost?: () => void;
};

export const useMyProfileCardModalHandle = ({
  initialDescription = '',
  onClose,
  onDeletePost,
}: Parameters) => {
  const [state, setState] = useState<ModalState>({
    cancelEditModalOpen: false,
    confirmDeleteModalOpen: false,
    description: initialDescription ?? '',
    isAttemptingToClose: false,
    isEditing: false,
    isFormFocused: false,
  });

  const setMutableState = useCallback((update: (draft: ModalState) => void) => {
    setState(produceByImmer(update));
  }, []);

  // `onClose` passed directly to the modal window triggers before `onBlur`
  //  on the post editing form, not allowing to check the entered description
  //  and the initializing value received via props.
  //  So we use a local state for "attempt to close" so that when the modal is closed,
  //  the actual description is already stored in the state.
  useEffect(() => {
    if (state.isAttemptingToClose && !state.isFormFocused) {
      if (state.description !== initialDescription) {
        setMutableState(draft => {
          draft.cancelEditModalOpen = true;
        });

        return;
      }

      setMutableState(draft => {
        draft.isAttemptingToClose = false;
        draft.isEditing = false;
      });
      onClose();
    }
  }, [state, setMutableState, initialDescription, onClose]);

  const onPostDeleteCommit = () => {
    setMutableState(draft => {
      draft.confirmDeleteModalOpen = false;
    });
    onDeletePost?.();
  };

  const onFormBlur = (description: string) =>
    setMutableState(draft => {
      draft.description = description;
      draft.isFormFocused = false;
    });

  const onFormFocus = () =>
    setMutableState(draft => {
      draft.isFormFocused = true;
    });

  const onEditCardBackClick = () => {
    if (state.description !== initialDescription) {
      setMutableState(draft => {
        draft.cancelEditModalOpen = true;
      });

      return;
    }

    setMutableState(draft => {
      draft.isEditing = false;
    });
  };

  const onCancelEditModalClose = () =>
    setMutableState(draft => {
      draft.isAttemptingToClose = false;
      draft.cancelEditModalOpen = false;
    });

  const onResetPostEditingAndClose = () => {
    setMutableState(draft => {
      draft.isEditing = false;
      draft.cancelEditModalOpen = false;
      draft.description = initialDescription;
    });

    if (state.isAttemptingToClose) {
      setMutableState(draft => {
        draft.isAttemptingToClose = false;
      });
      onClose();
    }
  };

  const onSwitchToEditMode = () =>
    setMutableState(draft => {
      draft.isEditing = true;
    });

  const onAttemptToClose = () =>
    setMutableState(draft => {
      draft.isAttemptingToClose = true;
    });

  const onConfirmDeleteModalOpen = () =>
    setMutableState(draft => {
      draft.confirmDeleteModalOpen = true;
    });

  const onConfirmDeleteModalClose = () =>
    setMutableState(draft => {
      draft.confirmDeleteModalOpen = false;
    });

  return {
    handlers: {
      onAttemptToClose,
      onCancelEditModalClose,
      onConfirmDeleteModalClose,
      onConfirmDeleteModalOpen,
      onEditCardBackClick,
      onFormBlur,
      onFormFocus,
      onPostDeleteCommit,
      onResetPostEditingAndClose,
      onSwitchToEditMode,
    },
    state,
  };
};
