<template>
  <div class="adicionar-estrategia-modal">
    <div class="modal-header">
      <h2>Adicionar estrategia</h2>
    </div>
    <form class="modal-body" @submit.prevent="validateForm">
      <div class="form-row">
        <div class="form-group small-width">
          <label for="no">No <span class="required">*</span></label>
          <input id="no" type="number" v-model="form.no" :class="{'input-error': errors.no || !form.no}" min="1" />
          <div v-if="errors.no" class="error-message">{{ errors.no }}</div>
        </div>
        <div class="form-group large-width">
          <label for="denominacion">Denominación <span class="required">*</span></label>
          <input id="denominacion" type="text" v-model="form.denominacion" :class="{'input-error': errors.denominacion || !form.denominacion}" />
          <div v-if="errors.denominacion" class="error-message">{{ errors.denominacion }}</div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">Datos generales</div>
        <div class="form-row">
          <div class="form-group">
            <label for="fechaInicio">Fecha inicio <span class="required">*</span></label>
            <input id="fechaInicio" type="date" v-model="form.fechaInicio" :class="{'input-error': errors.fechaInicio || !form.fechaInicio}" @change="animateDateInput" />
            <div v-if="errors.fechaInicio" class="error-message">{{ errors.fechaInicio }}</div>
          </div>
          <div class="form-group">
            <label for="fechaFin">Fecha fin <span class="required">*</span></label>
            <input id="fechaFin" type="date" v-model="form.fechaFin" :class="{'input-error': errors.fechaFin || !form.fechaFin}" @change="animateDateInput" />
            <div v-if="errors.fechaFin" class="error-message">{{ errors.fechaFin }}</div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">Responsable</div>
        <div v-if="errors.editor" class="error-message">{{ errors.editor }}</div>
        <QuillEditor
          v-model="editor.text"
          :toolbar="editorOptions.toolbar"
          theme="snow"
          class="quill-custom"
        />
      </div>
      <div class="modal-footer">
        <div class="footer-btn-group">
          <button type="submit" class="btn accept"><span class="icon">&#10004;</span>Aceptar</button>
          <button type="button" class="btn apply" @click="validateEditor"><span class="icon">&#128190;</span>Aplicar</button>
          <button type="button" class="btn cancel"><span class="icon">&#10006;</span>Cancelar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const form = reactive({
  no: '',
  denominacion: '',
  fechaInicio: '',
  fechaFin: '',
});

const editor = reactive({
  text: '',
});

const errors = reactive({
  no: '',
  denominacion: '',
  fechaInicio: '',
  fechaFin: '',
  editor: '',
});

const editorOptions = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: 1 }, { header: 2 }, 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['direction', { align: [] }],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

function validateEditor() {
  errors.editor = '';
  if (!editor.text || editor.text.replace(/<(.|\n)*?>/g, '').trim() === '') {
    errors.editor = 'El campo responsable es obligatorio.';
    return false;
  }
  return true;
}

function validateForm() {
  let valid = true;
  errors.no = '';
  errors.denominacion = '';
  errors.fechaInicio = '';
  errors.fechaFin = '';
  errors.editor = '';

  if (!form.no) {
    errors.no = 'El campo número es obligatorio.';
    valid = false;
  } else if (!/^\d+$/.test(form.no)) {
    errors.no = 'El campo número debe ser numérico.';
    valid = false;
  } else if (parseInt(form.no) <= 0) {
    errors.no = 'El campo número debe ser mayor que cero.';
    valid = false;
  }
  if (!form.denominacion) {
    errors.denominacion = 'El campo denominación es obligatorio.';
    valid = false;
  }
  if (!form.fechaInicio) {
    errors.fechaInicio = 'La fecha de inicio es obligatoria.';
    valid = false;
  }
  if (!form.fechaFin) {
    errors.fechaFin = 'La fecha de fin es obligatoria.';
    valid = false;
  }
  if (!validateEditor()) {
    valid = false;
  }
  if (valid) {
    // Aquí puedes enviar el formulario o hacer lo que necesites
    alert('Formulario válido y enviado');
  }
}

function animateDateInput(e) {
  e.target.classList.add('date-anim');
  setTimeout(() => {
    e.target.classList.remove('date-anim');
  }, 350);
}
</script>

<style scoped>
.adicionar-estrategia-modal {
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background: linear-gradient(135deg, #f9f6fb 60%, #f5e6f5 100%);
  box-shadow: 0 4px 24px #7c35772a, 0 1.5px 8px #a05fa02a;
  animation: fadeInModal 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 90px;
}
@keyframes fadeInModal {
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-header {
  background: #7c3577;
  color: #fff;
  padding: 0.7rem;
  border-radius: 24px 24px 0 0;
  font-size: 1rem;
  box-shadow: 0 2px 8px #a05fa02a;
  letter-spacing: 0.5px;
}
.modal-header h2 {
  margin: 0;
  font-size: 1.1rem;
}
.modal-body {
  flex: 1;
  padding: 1.5rem 2vw;
  overflow-y: auto;
}
@media (max-width: 900px) {
  .modal-body {
    padding: 1rem 1vw;
  }
}
@media (max-width: 600px) {
  .adicionar-estrategia-modal {
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
  .modal-body {
    padding: 0.5rem 0.5vw;
  }
}
.form-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  min-width: 0;
}
.form-group.small-width {
  flex: 0 0 80px;
  max-width: 80px;
}
.form-group.large-width {
  flex: 2 1 180px;
  max-width: 220px;
}
.form-group label {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.required {
  color: #a03a7c;
}
input[type="text"],
input[type="number"],
input[type="date"],
textarea {
  border: 1.5px solid #c9a3c9;
  background: #faf6fa;
  color: #222;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 1rem;
  transition: border 0.2s, background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px #a05fa01a;
}
input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
textarea:focus {
  box-shadow: 0 0 0 3px #a05fa055, 0 1px 4px #a05fa01a;
  border-color: #a05fa0;
  background: #f3e6f7;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  appearance: textfield;
}
.section {
  border: 2px solid #a05fa0;
  background: #f5e6f5;
  border-radius: 18px;
  margin-bottom: 0.7rem;
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: 0 1px 6px #a05fa01a;
  position: relative;
  overflow: hidden;
}
.section::before {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #a05fa0 0%, #7c3577 100%);
  opacity: 0.13;
  border-radius: 8px 8px 0 0;
}
.section-title {
  background: #a05fa0;
  color: #fff;
  font-weight: bold;
  padding: 0.3rem 0.7rem;
  border-radius: 14px 14px 0 0;
  margin-bottom: 0.2rem;
  font-size: 0.98rem;
  letter-spacing: 0.2px;
}
.quill-custom {
  border: 1px solid #c9a3c9;
  border-radius: 12px;
  background: #faf6fa;
  margin-bottom: 1rem;
  min-height: 300px;
  height: 350px;
}
:deep(.ql-container) {
  min-height: 220px;
  height: 270px;
  font-size: 1.05rem;
}
.modal-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  width: auto;
  background: none;
  z-index: 10;
  justify-content: flex-end;
  box-shadow: none;
  padding: 1.2rem 2vw 1.2rem 2vw;
  display: flex;
  align-items: flex-end;
}
.footer-btn-group {
  background: none;
  border-radius: 0;
  box-shadow: none;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.7rem;
}
.btn {
  border: none;
  border-radius: 10px;
  padding: 0.32rem 0.7rem;
  font-size: 0.93rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.25s, box-shadow 0.25s, transform 0.18s cubic-bezier(.4,2,.3,1), filter 0.18s;
  background: linear-gradient(90deg, #a05fa0 0%, #7c3577 100%);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.3em;
  box-shadow: 0 2px 8px #a05fa02a;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}
.btn:active {
  transform: scale(0.96) rotate(-1deg);
  filter: brightness(0.97) saturate(1.2);
  box-shadow: 0 1px 2px #7c35772a;
}
.btn:hover {
  filter: brightness(1.08) saturate(1.2);
  box-shadow: 0 4px 16px #a05fa044;
  transform: translateY(-2px) scale(1.03) rotate(0.5deg);
}
.btn::after {
  content: '';
  position: absolute;
  left: 50%; top: 50%;
  width: 0; height: 0;
  background: rgba(255,255,255,0.18);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
  z-index: 0;
}
.btn:active::after {
  width: 180%; height: 400%;
}
.btn span.icon {
  filter: drop-shadow(0 1px 1px #fff8);
}
.btn.cancel, .btn.apply, .btn.accept {
  background: linear-gradient(90deg, #a05fa0 0%, #7c3577 100%);
  color: #fff;
}
.btn.cancel:hover, .btn.apply:hover, .btn.accept:hover {
  background: linear-gradient(90deg, #7c3577 0%, #a05fa0 100%);
  box-shadow: 0 4px 16px #a05fa044;
}
.btn .icon {
  font-size: 1.1em;
  margin-right: 0.2em;
}
.input-error {
  border: 1.5px solid #d32f2f !important;
  background: #fff6f6;
}
.error-message {
  color: #d32f2f;
  font-size: 0.93em;
  margin-top: 0.15em;
  margin-bottom: 0.1em;
  min-height: 1.1em;
  line-height: 1.1em;
  display: block;
  white-space: pre-line;
  transition: color 0.2s, opacity 0.2s;
  opacity: 1;
  text-shadow: 0 1px 2px #fff8;
}
::-webkit-scrollbar {
  background: #e0d7ee;
}
::-webkit-scrollbar-thumb {
  background: #bdb6c6;
}
</style>
