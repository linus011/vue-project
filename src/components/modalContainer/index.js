import { ref, readonly } from 'vue';
import Modal from './Modal.vue';
 
const PLUGIN_NAME = 'VueUniversalModal1';
const CLASS_NAME = 'vue-universal-modal';
 
const install = (app, options = {}) => {
  const {
    teleportTarget = '',
    teleportComponent = '',
    teleportComponentId = '',
    modalComponent = 'Modal',
  } = options;
 
  if (!teleportTarget) {
    return console.error('teleportTarget is required.');
  }
 
  if (teleportComponent || teleportComponentId) {
    return console.error(
      'teleportComponent, teleportComponentId was deprecated. use teleportTarget instead. (https://github.com/hoiheart/vue-universal-modal)',
    );
  }
 
  const visibleModals = ref(new Set());
  const addVisibleModals = (el) => {
    visibleModals.value.add(el);
  };
  const removeVisibleModals = (el) => {
    visibleModals.value.delete(el);
  };
 
  app.provide(PLUGIN_NAME, {
    teleportTarget,
    visibleModals: readonly(visibleModals),
    addVisibleModals,
    removeVisibleModals,
  });
 
  app.component(modalComponent, Modal);
};
 
export default {
  install,
};
 
export { PLUGIN_NAME, CLASS_NAME };