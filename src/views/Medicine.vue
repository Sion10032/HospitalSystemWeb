<template>
  <v-container fluid>
    <div>
      <v-data-table
        :headers="headers"
        :items="$store.state.medicines"
        sort-by="calories"
        class="elevation-1"
        style="border-radius: 8px;">
        <template v-slot:top>
          <v-toolbar flat color="transparent">
            <v-toolbar-title>药品记录</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">新增药品</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedMedicine.medicine_type"
                          :items="$store.state.medicineTypes"
                          item-text="name"
                          item-value="id"
                          label="药品类型">
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedMedicine.name" label="药品名称"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedMedicine.in_price" label="购入价格"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedMedicine.price" label="出售价格"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedMedicine.count" label="数量"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small @click="editMedicine(item)" class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteMedicine(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      headers: [
        {
          text: '药品名称',
          value: 'name'
        },
        {
          text: '购进单价',
          value: 'in_price'
        },
        {
          text: '售出单价',
          value: 'price'
        },
        {
          text: '库存',
          value: 'count'
        },
        {
          text: '操作',
          value: 'action',
          sortable: false
        }
      ],
      dialog: false,
      editIndex: -1,
      defaultMedicine: {
        'medicine_type': 1,
        'name': '药物',
        'in_price': 0.5,
        'price': 50,
        'count': 1000
      },
      editedMedicine: {
        'medicine_type': 1,
        'name': '药物',
        'in_price': 0.5,
        'price': 50,
        'count': 1000
      }
    }
  },
  computed: {
    formTitle: function () {
      return this.editIndex === -1 ? '新增药品' : '编辑药品'
    }
  },
  methods: {
    updateMedicine: function () {
      this.$axios({
        method: 'get',
        url: '/medicine/'
      }).then((res) => {
        this.$store.commit('setMedicines', res.data)
      })
    },
    editMedicine: function (item) {
      this.editedIndex = this.$store.state.medicines.indexOf(item)
      this.editedMedicine = Object.assign({}, item)
      this.dialog = true
    },
    deleteMedicine: function (item) {
      this.$axios({
        method: 'delete',
        url: '/medicine/' + item.id + '/'
      }).then((res) => {
        this.updateMedicine()
        alert('删除成功！')
      }).catch((err) => {
        console.log(err)
        alert('删除药品失败：' + (err.response ? err.response.data.detail : 'Error'))
      })
    },
    close: function () {
      this.dialog = false
      this.editedMedicine = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    save: function () {
      let url = '/medicine/' + (this.editedIndex > -1 ? this.editedMedicine.id + '/' : '')
      this.$axios({
        method: this.editedIndex > -1 ? 'put' : 'post',
        url: url,
        data: {
          'medicine_type': this.editedMedicine.medicine_type,
          'name': this.editedMedicine.name,
          'in_price': this.editedMedicine.in_price,
          'price': this.editedMedicine.price,
          'count': this.editedMedicine.count
        }
      }).then((res) => {
        this.updateMedicine()
        alert((this.editedIndex > -1 ? '更新' : '新增') + '成功')
      }).catch((err) => {
        console.log(err)
        alert((this.editedIndex > -1 ? '更新' : '新增') + '药品失败：' + (err.response ? err.response.data.detail : 'Error'))
      }).finally(() => {
        this.close()
      })
    }
  }
}
</script>

<style>
</style>
