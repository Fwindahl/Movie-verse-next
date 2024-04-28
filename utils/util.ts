

export enum AsyncStatus {
    idle,
    pending,
    success,
    fail
  }
  
export type TimeUnit = 300
  
  export async function handleLoading(status: AsyncStatus, timeUnit: TimeUnit, callback: (status: AsyncStatus) => void): Promise<void> {
      return new Promise((resolve)=>{
          setTimeout(()=>{
            resolve(callback(status))
          },timeUnit)
      })
  }