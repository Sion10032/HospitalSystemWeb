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
          <v-btn small color="primary" v-if="state !== 2" @click="isNew = true, state = 2">新建病历</v-btn>
          <div class="divider" v-if="state !== 0"/>
          <v-btn small color="primary" v-if="state === 1" @click="isNew = false, state = 2">编辑病历</v-btn>
          <div class="divider" v-if="state > 1"/>
          <v-btn small color="primary" v-if="state === 2" @click="OnSaveClick">保存病历</v-btn>
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
