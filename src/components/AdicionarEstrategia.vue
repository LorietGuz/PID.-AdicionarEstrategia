<template>
  <div class="adicionar-estrategia-modal">
    <div class="modal-header">
      <h2>Adicionar estrategia</h2>
    </div>
    <form class="modal-body" @submit.prevent>
      <div class="form-row">
        <div class="form-group">
          <label for="no">No <span class="required">*</span></label>
          <input id="no" type="number" v-model="form.no" required />
        </div>
        <div class="form-group">
          <label for="denominacion">Denominación <span class="required">*</span></label>
          <input id="denominacion" type="text" v-model="form.denominacion" required />
        </div>
      </div>
      <div class="section">
        <div class="section-title">Datos generales</div>
        <div class="form-row">
          <div class="form-group">
            <label for="fechaInicio">Fecha inicio <span class="required">*</span></label>
            <input id="fechaInicio" type="date" v-model="form.fechaInicio" required />
          </div>
          <div class="form-group">
            <label for="fechaFin">Fecha fin <span class="required">*</span></label>
            <input id="fechaFin" type="date" v-model="form.fechaFin" required />
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">Responsable</div>
        <div class="editor-toolbar">
          <select v-model="editor.font">
            <option>Helvetica</option>
            <option>Arial</option>
            <option>Times New Roman</option>
          </select>
          <button type="button" class="toolbar-btn"><b>B</b></button>
          <button type="button" class="toolbar-btn"><i>I</i></button>
          <button type="button" class="toolbar-btn"><u>U</u></button>
          <button type="button" class="toolbar-btn">S</button>
          <button type="button" class="toolbar-btn">A</button>
          <button type="button" class="toolbar-btn">🎨</button>
          <button type="button" class="toolbar-btn">🖊️</button>
          <button type="button" class="toolbar-btn">⯈</button>
          <button type="button" class="toolbar-btn">⯇</button>
          <button type="button" class="toolbar-btn">•</button>
          <button type="button" class="toolbar-btn">1.</button>
          <button type="button" class="toolbar-btn">→</button>
        </div>
        <textarea v-model="editor.text" rows="4" class="editor-area"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn cancel">✖ Cancelar</button>
        <button type="button" class="btn apply">✔ Aplicar</button>
        <button type="submit" class="btn accept">➕ Aceptar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  no: '',
  denominacion: '',
  fechaInicio: '',
  fechaFin: '',
});

const editor = reactive({
  font: 'Helvetica',
  text: '',
});
</script>

<style scoped>
.adicionar-estrategia-modal {
  border: 2px solid #8e4585;
  border-radius: 10px;
  background: #fff;
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0 2px 12px #0002;
  font-family: Arial, sans-serif;
}
.modal-header {
  background: #7c3577;
  color: #fff;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
}
.modal-header h2 {
  margin: 0;
  font-size: 1.3rem;
}
.modal-body {
  padding: 1.5rem;
}
.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  border: 1px solid #c9a3c9;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  background: #faf6fa;
}
.section {
  border: 2px solid #a05fa0;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  background: #f5e6f5;
}
.section-title {
  background: #a05fa0;
  color: #fff;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 6px 6px 0 0;
  margin-bottom: 0.5rem;
}
.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #e9d3ec;
  padding: 0.3rem 0.5rem;
  border-radius: 5px 5px 0 0;
}
.editor-toolbar select {
  margin-right: 0.5rem;
  border-radius: 3px;
  border: 1px solid #c9a3c9;
  padding: 0.2rem 0.5rem;
}
.toolbar-btn {
  background: none;
  border: none;
  color: #7c3577;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 0.3rem;
}
.editor-area {
  width: 100%;
  min-height: 60px;
  border-radius: 0 0 5px 5px;
  border-top: none;
  border: 1px solid #c9a3c9;
  background: #faf6fa;
  margin-bottom: 1rem;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #e9d3ec;
  padding: 1rem;
  border-radius: 0 0 8px 8px;
}
.btn {
  border: none;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.btn.cancel {
  background: #a05fa0;
  color: #fff;
}
.btn.apply {
  background: #7c3577;
  color: #fff;
}
.btn.accept {
  background: #fff;
  color: #7c3577;
  border: 2px solid #7c3577;
}
.btn.accept:hover {
  background: #f5e6f5;
}
</style>
