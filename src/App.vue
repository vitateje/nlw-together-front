<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Usuarios Valoriza</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="user.name" />
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="user.email" />
        <label>Admin</label>
        <input type="text" placeholder="Usuario Admin" v-model="user.admin" />
        <label>Senha</label>
        <input type="text" placeholder="Password" v-model="user.password" />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user of users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.admin }}</td>
            <td>
              <button
                @click="editar(user)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remover(user)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import User from "./services/produtos";

export default {
  data() {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        admin: "",
      },

      users: [],

      errors: [],
    };
  },
  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      User.listar().then((resposta) => {
        this.users = resposta.data;
      });
    },

    salvar() {
      if (!this.user.id) {
        User.salvar(this.user)
          .then((resposta) => {
            this.user = {};
            this.users = resposta.data;
            this.listar();
          })
          .catch((e) => {
            this.errors = e.reponse.data.errors;
          });
      } else {
        User.atualizar(this.user)
          .then((resposta) => {
            alert("Dados Atualizados com sucesso");
            this.user = {};
            this.users = resposta.data;
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    editar(user) {
      this.user = user;
    },

    remover(user) {
      if (confirm("Deseja excluir o produto?")) {
        User.apagar(user)
          .then((resposta) => {
            alert("Dados Atualizados com sucesso");
            this.listar();
            this.users = resposta.data;
            this.errors = [];
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
  },
};
</script>

<style>

.container {
  margin-top: 25px;
}
</style>
