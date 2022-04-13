<template>
  <v-form ref="form" v-model="valid" class="text-right" @submit.prevent="send">
    <v-text-field
      v-model="name"
      :rules="[(v) => !!v || 'Представьтесь, пожалуйста']"
      label="ФИО"
      required
      class="mb-2"
    ></v-text-field>

    <!-- TODO: add mask -->
    <v-text-field
      v-model="phone"
      :rules="[(v) => !!v || 'Подскажите как с Вами связаться']"
      label="Телефон"
      type="phone"
      required
      class="mb-2"
    ></v-text-field>

    <v-textarea
      v-model="message"
      :rules="[(v) => !!v || 'Расскажите в чем проблема']"
      label="Опишите проблему"
      required
      class="mb-2"
    ></v-textarea>

    <!-- TODO: captcha -->

    <v-btn
      :disabled="!valid"
      type="submit"
      color="success"
      class="ml-auto"
      :loading="isSending"
    >
      Отправить обращение
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'SendMessage',
  data: () => ({
    name: null,
    phone: null,
    message: null,
    valid: false,
    isSending: false,
  }),
  methods: {
    async send() {
      this.isSending = true
      const data = {
        name: this.name,
        phone: this.phone,
        message: this.message,
      }
      await this.$axios.post('/api/sendMessage', data)
      this.isSending = false
      this.$refs.form.reset()
      this.$emit('sended')
    },
  },
}
</script>