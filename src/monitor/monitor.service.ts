import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import * as si from 'systeminformation';

@Injectable()
export class MonitorService {
  async getServerInfo() {
    // 获取 CPU 信息
    const cpu = await si.cpu();
    
    // 获取内存信息
    const memory = await si.mem();

    // 获取磁盘信息
    const disks = await si.diskLayout();

    // 获取操作系统信息
    const os = await si.osInfo();
    return {
        cpu: {
          cpuNum: cpu.cores,
          total: cpu.speed, // 这里只是一个示例，实际需要根据需求调整
          sys: 0,           // 系统空闲时间（可以补充实际逻辑）
          used: 0,          // 使用的时间
          wait: 0,          // 等待的时间
          free: 100         // 示例值
        },
        mem: {
          total: (memory.total / 1024 / 1024 / 1024).toFixed(2), // GB
          used: (memory.used / 1024 / 1024 / 1024).toFixed(2),   // GB
          free: (memory.free / 1024 / 1024 / 1024).toFixed(2),   // GB
          usage: ((memory.used / memory.total) * 100).toFixed(2) // 使用率 %
        },
        sys: {
          computerName: os.hostname,
          computerIp: '', // 需要额外方法获取 IP 地址
          userDir: process.cwd(),
          osName: os.distro,
          osArch: os.arch
        },
        sysFiles: disks.map(disk => {
            return disk
        })
      };
  }
}
