

enum AsyncStatus {
    idle,
    pending,
    success,
    fail
  }
  
  type TimeUnit = 300
  
  export async function handleLoading(status: AsyncStatus, timeUnit: TimeUnit, callback: (status: AsyncStatus) => void) {
      return new Promise((resolve)=>{
          setTimeout(()=>{
            resolve(callback(status))
          },timeUnit)
      })
  }