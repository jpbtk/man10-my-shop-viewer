{
  const saveAPIKey = (key) => {
    window.localStorage.setItem('API_KEY', key)
  }

  const loadAPIKey = () => {
    return window.localStorage.getItem('API_KEY')
  }

  async function getShopList () {
    // 入力されたAPIキーをlocalStorageに保存
    const key = keyElement.value
    saveAPIKey(key)

    // POST送信用にFormDataオブジェクトに変換
    const form = new FormData()
    form.append('key', key)

    // PHPにリクエストを投げる
    const f = await fetch('shop.php', {
      method: 'POST',
      body: form
    })

    // PHPからのレスポンスをJSON形式で受け取る
    const shopData = await f.json()
    
    // 受け取ったショップ情報を表に挿入
    const tBody = tableElement.tBodies[0]
    tBody.innerHTML = ''
    for (const i of shopData) {
      const tr = tBody.insertRow()
      tr.innerHTML += `
        <td>${i.name}</td>
        <td>${i.shopType}</td>
        <td>${i.icon.material}</td>
        <td>${i.itemCount}</td>
        <td>${i.money}</td>
      `
    }
  }

  const keyElement = document.querySelector('input')
  const buttonElement = document.querySelector('button')
  const tableElement = document.querySelector('table')

  // localStorageにキーが保存されている場合は復元
  keyElement.value = loadAPIKey() || ''

  // ボタンを押下したときのイベントリスナ設置
  buttonElement.addEventListener('click', getShopList)
}
