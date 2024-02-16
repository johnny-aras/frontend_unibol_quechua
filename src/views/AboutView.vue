<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div v-if="showInfo">
    <span>
      {{ title }} - {{ career }} - {{ age }}
    </span>   
  </div>
  <button  @click="toogleInfo">
      <span v-if="showInfo">
        Hide Information
      </span>
      <span v-else>
        Show Information
      </span>
    </button>
    <span v-show="showInfo">Showing Information</span>
</template>
<script>
export default {
  data()
  {    
    return {
      title:'Johny',
      career:'System Engineer',
      age:'30',
      showInfo:true
    }
  },
  mounted()
  {
    this.changeTitle()  
  },
  methods: {
    changeTitle(){
      this.title='Johnny'
    },toogleInfo()
    {
      this.showInfo=!this.showInfo;
    }
  },
}
</script>
