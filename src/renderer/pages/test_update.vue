<template>
  <div id="update_now">
    <el-dialog
      title="应用更新......"
      :visible="showUpdater"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="620px"
      top="26vh"
      center>
      <template v-if="downloadProcess">
        <p>{{'当前:' + downloadProcess.transferred + '   /   共' + downloadProcess.total}}</p>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="downloadProcess.percent"></el-progress>
        <p>正在下载({{downloadProcess.speed}})......</p>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'update_now',
  data() {
    return {
      showUpdater: false,
      downloadProcess: null
    }
  },
  created() {

	console.log("hello world miao")

	ipcRenderer.send("checkForUpdate");
	
	
    // 发现新版本
    ipcRenderer.on('updateAvailable', (event, info) => {
        console.log("更新吗亲？？？")
        setTimeout(() => {
            this.$confirm(`发现有新版本【v${info.version}】，是否更新?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal: false
            }).then(() => {
                ipcRenderer.send('autoUpdater-toDownload')
            })
        }, 500)
    })
    // 下载进度
    ipcRenderer.on('downloadProgress', (event, process) => {
		console.log("下载呢…… ")
        console.log(event)
        if (process.transferred >= 1024 * 1024) {
            process.transferred = (process.transferred / 1024 / 1024).toFixed(2) + 'M'
        } else {
            process.transferred = (process.transferred / 1024).toFixed(2) + 'K'
        }
        if (process.total >= 1024 * 1024) {
            process.total = (process.total / 1024 / 1024).toFixed(2) + 'M'
        } else {
            process.total = (process.total / 1024).toFixed(2) + 'K'
        }
        if (process.bytesPerSecond >= 1024 * 1024) {
            process.speed = (process.bytesPerSecond / 1024 / 1024).toFixed(2) + 'M/s'
        } else if (process.bytesPerSecond >= 1024) {
            process.speed = (process.bytesPerSecond / 1024).toFixed(2) + 'K/s'
        } else {
            process.speed = process.bytesPerSecond + 'B/s'
        }
        process.percent = parseInt(process.percent.toFixed(2));
        this.downloadProcess = process
        this.showUpdater = true
    })
    // 下载更新失败
    ipcRenderer.on('update-error', (event) => {
        console.log(event);
        console.log('更新失败！');
        this.showUpdater = false;
    })
    // 下载完成
    ipcRenderer.on('autoUpdater-downloaded', () => {
        this.$confirm(`更新完成，是否关闭应用程序安装新版本?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false
        }).then(() => {
            ipcRenderer.send('exit-app')
        })
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
