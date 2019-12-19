<template>
  <v-container class="d-flex justify-center" fluid>
    <v-container v-if="patient" class="d-flex flex-column flex-grow-1">
      <v-card class="info-wrapper">
        <div class="overline mb-4">病人信息</div>
        <v-row style="height: 32px;" no-gutters>
          <v-col>
            <p class="text">姓名：{{ patient.profile.name }}</p>
          </v-col>
          <v-col>
            <p class="text">性别：{{ patient.profile.gender ? '男' : '女' }}</p>
          </v-col>
          <v-col>
            <p class="text">年龄：{{ 24 }}</p>
          </v-col>
        </v-row>
        <v-row style="height: 32px;" no-gutters>
          <v-col>
            <p class="text">姓名拼音：{{ pinyin }}</p>
          </v-col>
          <v-col>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-card>
      <div class="d-flex justify-space-between info-wrapper" style="padding: 5px 0;">
        <div></div>
        <div class="button-wrapper d-flex justify-center align-center" v-if="!isEnd">
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state !== 2" @click="isNew = true, state = 2">新建病历</v-btn>
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state === 1" @click="isNew = false, state = 2">编辑病历</v-btn>
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state === 2" @click="OnSaveClick">保存病历</v-btn>
          <v-btn small color="primary" style="margin-left: 10px;" v-if="state === 1" @click="OnEndClick">结束诊断</v-btn>
        </div>
      </div>
      <v-card class="info-wrapper" v-if="state !== 0">
        <div class="overline mb-4">病情分析</div>
        <v-text-field
          label="病情诊断"
          v-model="diagnosis"
          :disabled="state !== 2"
          no-resize>
        </v-text-field>
        <v-textarea
          label="病情描述(Optional)"
          rows="2"
          v-model="detail"
          :disabled="state !== 2"
          counter no-resize>
        </v-textarea>
        <v-textarea
          label="病人自述(Optional)"
          rows="2"
          :disabled="state !== 2"
          counter no-resize>
        </v-textarea>
        <v-textarea
          label="病人病史(Optional)"
          rows="2"
          :disabled="state !== 2"
          counter no-resize>
        </v-textarea>
        <v-textarea
          label="病人药物史(Optional)"
          rows="2"
          :disabled="state !== 2"
          counter no-resize>
        </v-textarea>
      </v-card>
      <v-card class="info-wrapper" v-if="state > 0">
        <div class="d-flex justify-space-between overline mb-4">
          处方单
          <v-btn v-if="state === 2" text small @click="createMedicine">新增药品</v-btn>
        </div>
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
      </v-card>
      <v-card class="info-wrapper" v-if="state > 0">
        <div class="overline mb-4">化验单</div>
        <v-select
          v-model="labs"
          :items="$store.state.labTypes"
          item-text="name"
          item-value="id"
          multiple
          chips
          :disabled="state !== 2">
        </v-select>
      </v-card>
    </v-container>
    <v-container v-if="state === 2" class="flex-grow-0 flex-shrink-0 d-flex" style="width: 180px;">
      <v-card class="flex-grow-1">
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
  // ToDo: 完成诊断后设置病历为不可编辑，并去除localStorage中的curPatient
  props: [ 'patientId' ],
  data: function () {
    return {
      patient: null,
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
      labs: [],
      res: null,
      isEnd: false,
      isNew: true,
      state: 0 // 0为空闲，1为查看，2为编辑
    }
  },
  computed: {
    pinyin: function () {
      if (!this.patient) {
        return 'PIN YIN'
      }
      let res = ''
      for (let ch of this.$pinyin(this.patient.profile.name)) {
        res += ch[0] + ' '
      }
      return res
    }
  },
  watch: {
    patientId: function (newValue, oldValue) {
      if (newValue === localStorage.getItem('curPatient')) {
        this.loadInfo()
      } else {
        this.$router.push({ name: 'diagnosis', params: { patientId: localStorage.getItem('curPatient') } })
      }
    },
    record: function (newValue, oldValue) {
      if (newValue !== undefined && this.state === 2) {
        this.detail = this.records[newValue].value.detail
        this.diagnosis = this.records[newValue].value.diagnosis
      }
    }
  },
  created: function () {
    if (localStorage.getItem('curPatient') !== 0 && this.patientId !== localStorage.getItem('curPatient')) {
      this.$router.push({ name: 'diagnosis', params: { patientId: localStorage.getItem('curPatient') } })
    } else {
      this.loadInfo()
    }
  },
  methods: {
    loadInfo: function () {
      this.$axios({
        method: 'get',
        url: '/users/' + this.patientId + '/'
      }).then((res) => {
        this.patient = res.data
      })
    },
    OnSaveClick: function () {
      if (this.isNew) {
        // ToDo 部门ID
        // 病历
        this.$axios({
          method: 'post',
          url: '/medical-records/',
          data: {
            patient: this.patientId,
            department: 223,
            onset_date: new Date().toLocaleDateString().split('/').join('-'),
            diagnosis: this.diagnosis,
            detail: this.detail
          }
        }).then((res) => {
          this.res = res.data
          console.log(res)
          alert('创建成功')
        })
        // 处方
        this.$axios({
          method: 'post',
          url: '/prescriptions/',
          data: {
            patient: this.patientId,
            items: this.prescription.items
          }
        }).then((res) => {
          alert('创建成功')
        })
        // 化验
        let tLaps = []
        for (let it of this.labs) {
          tLaps.push({ laboratory_type: it })
        }
        this.$axios({
          method: 'post',
          url: '/laboratories/',
          data: {
            patient: this.patientId,
            executor: 223,
            items: tLaps
          }
        }).then((res) => {
          alert('创建成功')
        })
      }
      this.state = 1
    },
    OnEndClick: function () {
      this.axios({
        method: 'put',
        url: '/medical-records/' + this.res.id + '/',
        data: {
          can_modify: false
        }
      }).then((res) => {
        this.isEnd = true
        localStorage.setItem('curPatient', '')
        alert('结束诊断！')
      })
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
  padding: 16px;
  margin-bottom: 20px;
}
</style>
