<template>
  <v-container class="d-flex justify-center" fluid>
    <v-container class="d-flex flex-column flex-grow-1">
      <v-card class="info-wrapper">
        <div class="overline mb-4">病人信息</div>
        <v-row style="height: 32px;" no-gutters>
          <v-col>
            <p class="text">姓名：{{ 'Name' }}</p>
          </v-col>
          <v-col>
            <p class="text">性别：{{ 'Gender' }}</p>
          </v-col>
          <v-col>
            <p class="text">年龄：{{ 'Age' }}</p>
          </v-col>
        </v-row>
        <v-row style="height: 32px;" no-gutters>
          <v-col>
            <p class="text">姓名拼音：{{ 'PIN YIN' }}</p>
          </v-col>
          <v-col>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-card>
      <div class="divider"/>
      <div class="d-flex justify-space-between" style="height: 40px">
        <div></div>
        <div class="button-wrapper d-flex justify-center align-center">
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state !== 2" @click="isNew = true, state = 2">新建病历</v-btn>
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state === 1" @click="isNew = false, state = 2">编辑病历</v-btn>
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state === 2" @click="OnSaveClick">保存病历</v-btn>
        </div>
      </div>
      <div class="divider"/>
      <v-card class="info-wrapper" v-if="state !== 0">
        <div class="overline mb-4">病情分析</div>
        <v-text-field
          label="病情诊断"
          hint="医生对病人的诊断"
          v-model="diagnosis"
          :disabled="state !== 2">
        </v-text-field>
        <div class="divider"/>
        <v-textarea
          label="病情描述"
          hint="医生对病情的详细描述（可空）"
          height="60px"
          counter="200"
          v-model="detail"
          :disabled="state !== 2"
        ></v-textarea>
        <div class="divider"/>
        <v-textarea
          label="病人自述"
          hint="病人对病情的描述（可空）"
          counter="200"
          height="60px"
          :disabled="state !== 2"
        ></v-textarea>
        <div class="divider"/>
        <v-textarea
          label="病人病史"
          hint="病人的病史（可空）"
          counter="200"
          height="60px"
          :disabled="state !== 2"
        ></v-textarea>
        <div class="divider"/>
        <v-textarea
          label="病人药物史"
          hint="病人的药物史（可空）"
          counter="200"
          height="60px"
          :disabled="state !== 2"
        ></v-textarea>
      </v-card>
      <div class="divider"/>
      <v-card class="info-wrapper" v-if="state > 0">
        <div class="overline mb-4">处方单</div>
        <div v-for="(item, index) in prescription.items" :key="index" style="margin: -12px 0 -32px 0;">
          <v-row>
            <v-col md="2">
              <v-select
                v-model="item.medicine"
                :items="$store.state.medicines"
                item-text="name"
                item-value="id"
                label="药品">
              </v-select>
            </v-col>
            <v-col>
              <v-text-field
                label="药品用法"
                v-model="item.method">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="服用频率"
                v-model="item.ratio">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="服用时长"
                v-model="item.days">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="药物数量"
                v-model="item.count">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="数量单位"
                v-model="item.count_unit">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="每次用量"
                v-model="item.dosage">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="用量单位"
                v-model="item.dosage_unit">
              </v-text-field>
            </v-col>
            <v-col class="col-auto d-flex align-center">
              <v-btn text icon color="grey" @click="deleteMedicine(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div style="margin-top: 24px;">
          <v-btn text small @click="createMedicine">新增药品</v-btn>
        </div>
      </v-card>
    </v-container>
    <v-container v-if="state === 2" class="flex-grow-0 flex-shrink-0 d-flex" style="width: 180px;">
      <v-card class="align-self-stretch flex-grow-1">
        <div class="overline mb-4" style="margin: 15px">病历模板</div>
        <v-list dense>
          <v-list-item-group v-model="record" color="primary">
            <template v-for="record in records">
              <v-list-item :key="record.title" link>
                <v-list-item-content>
                  <v-list-item-title>{{ record.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      record: -1,
      records: [
        {
          title: '模板1',
          value: {
            diagnosis: '模板1',
            detail: '模板1'
          }
        },
        {
          title: '模板2',
          value: {
            diagnosis: '模板2',
            detail: '模板2'
          }
        },
        {
          title: '模板3',
          value: {
            diagnosis: '模板3',
            detail: '模板3'
          }
        }
      ],
      diagnosis: '',
      detail: '',
      prescription: {
        patient: -1,
        items: []
      },
      isNew: true,
      state: 0 // 0为空闲，1为查看，2为编辑
    }
  },
  watch: {
    record: function (newValue, oldValue) {
      if (newValue !== undefined && this.state === 2) {
        this.detail = this.records[newValue].value.detail
        this.diagnosis = this.records[newValue].value.diagnosis
      }
    }
  },
  methods: {
    OnSaveClick: function () {
      console.log(this.isNew)
      if (this.isNew) {

      }
      this.state = 1
    },
    createPrescription: function () {
      this.prescriptions.push({
        items: []
      })
    },
    createMedicine: function () {
      this.prescription.items.push({
        medicine: 1,
        method: '口服',
        ratio: '3次/天',
        days: 7,
        count: 1,
        count_unit: '盒',
        dosage: '1',
        dosage_unit: '粒',
        commet: '',
        skin_test: ''
      })
    },
    deleteMedicine: function (index) {
      this.prescription.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 5px;
}
.info-wrapper {
  padding: 15px;
}
.divider {
  height: 20px;
}
</style>
