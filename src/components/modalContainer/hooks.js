import { computed, inject, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { PLUGIN_NAME, CLASS_NAME } from './index';
 
export const useA11Y = ({ modalRef, latest, show }) => {
  let activeElement = null;
 
  function setLastActiveElement(event) {
    const isModalEvent = event.target.closest(`.${CLASS_NAME}`);
 
    // skip when this not latest modal
    if (!latest.value) return;
 
    // set activeElement when fired outside this modal
    if (!isModalEvent || isModalEvent !== modalRef.value) {
      // skip when modal status is closing
      if (isModalEvent && !isModalEvent.classList.contains(`${CLASS_NAME}-show`)) {
        return;
      }
      activeElement = event.target;
    }
  }
 
  function setFocus(value) {
    if (value) {
      if (modalRef.value) {
        modalRef.value.focus();
      }
    } else {
      if (activeElement) {
        activeElement.focus();
      }
    }
  }
 
  onMounted(() => {
    document.addEventListener('click', setLastActiveElement);
    watch(
      () => show.value,
      (value) => {
        nextTick(() => setFocus(value));
      },
      { immediate: show.value },
    );
  });
 
  onUnmounted(() => {
    document.removeEventListener('click', setLastActiveElement);
  });
};
 
export const useClose = ({ close, closeClickDimmed, closeKeyCode, latest }) => {
  let actionTarget = null;
 
  function onMouseDownDimmed(e) {
    actionTarget = e.target;
  }
 
  function onMouseUpDimmed(e) {
    if (closeClickDimmed && actionTarget === e.target) {
      close.value();
    }
    actionTarget = null;
  }
 
  function closeKeyEvent(event) {
    if (event.keyCode === closeKeyCode && latest.value) {
      close.value();
    }
  }
 
  onMounted(() => {
    if (closeKeyCode) {
      document.addEventListener('keyup', closeKeyEvent);
    }
  });
 
  onUnmounted(() => {
    if (closeKeyCode) {
      document.removeEventListener('keyup', closeKeyEvent);
    }
  });
 
  return {
    onMouseDownDimmed,
    onMouseUpDimmed,
  };
};
 
export const useOrder = ({ modalRef, show }) => {
  const { visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME);
 
  const latest = computed(() => {
    const arr = [...visibleModals.value.values()];
 
    if (!arr.length || !modalRef.value) {
      return false;
    }
 
    return arr[arr.length - 1] === modalRef.value;
  });
 
  watch(
    () => show.value,
    () => {
      nextTick(() => {
        if (!modalRef.value) return;
 
        if (show.value) {
          addVisibleModals(modalRef.value);
        } else {
          removeVisibleModals(modalRef.value);
        }
      });
    },
    { immediate: true },
  );
 
  return {
    latest,
  };
};