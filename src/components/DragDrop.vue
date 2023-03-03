<template>
  <div>
    <div @dragover.prevent @drop="onDrop">
      <label
        v-if="!image"
        :class="[isDrag ? 'classDrug' : '', 'btn', 'display-inline']"
        @dragenter="isDrag = true"
        @dragleave="isDrag = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-layers"
          viewBox="0 0 16 14"
        >
          <path
            d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z"
          />
        </svg>
        <span class="ml-1">Drag or upload a photo</span>
        <input type="file" name="image" class="panel" @change="onChange" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "",
      isDrag: false,
    };
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        this.isDrag = false;
        return;
      }
      const reader = new FileReader();
      const vm = this;

      reader.onload = function (e) {
        vm.image = e.target.result;
      };

      this.$emit("upload_avatar", file);
    },
    removeFile() {
      this.image = "";
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  background-color: #4fc3f7;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  transition: 0.5s;
  &:hover {
    background-color: #0288d1;
  }
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
  border-radius: 5px;
}

.classDrug {
  background-color: #0288d1;
}
</style>
