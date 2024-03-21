import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chunks = '0';

  deviceIn = '/dev/sdb';
  deviceLen = '1000';
  folderOut = '/mnt/device';
  ansBackup = '# Nenhum';

  folderIn = '/mnt/device';
  deviceOut = '/dev/sdc';
  ansRestore = '# Nenhum';

  backup() {
    if (this.chunks === '0') {
      this.ansBackup = `sudo ddrescue -d -r3 ${this.deviceIn} ${this.folderOut}/bkp.img bkp.log`;
    } else {
      const deviceLen = parseInt(this.deviceLen);
      const chuncks = parseInt(this.chunks);
      let i = 0;
      this.ansBackup = '';
      for (let i = 0; i * chuncks < deviceLen; i++) {
        this.ansBackup += `sudo ddrescue -d -r3 -o 0 -i ${i * chuncks} -s ${this.chunks} ${this.deviceIn} ${this.folderOut}/bkp${i}.img bkp${i}.log\n`;
      }
    }
  }

  restore() {
    if (this.chunks === '0') {
      this.ansRestore = `sudo ddrescue -d -r3 ${this.folderIn}/bkp.img ${this.deviceOut} rst.log`;
    } else {
      const deviceLen = parseInt(this.deviceLen);
      const chuncks = parseInt(this.chunks);
      let i = 0;
      this.ansRestore = '';
      for (let i = 0; i * chuncks < deviceLen; i++) {
        this.ansRestore += `sudo ddrescue -d -r3 -o ${i * chuncks} ${this.folderIn}/bkp${i}.img ${this.deviceOut} rst${i}.log\n`;
      }
    }
  }
}
