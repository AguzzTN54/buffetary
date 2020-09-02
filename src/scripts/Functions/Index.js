const jamBuka = () => {
  const week = Math.floor(Math.random() * 2)
  const buka24jam = Math.floor(Math.random() * 2)

  const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

  let jbuka, jtutup

  if (buka24jam) {
    jbuka = '00:00'
    jtutup = '24:00'
  } else {
    jbuka = '0' + (Math.floor(Math.random() * 3) + 7).toString() + ':00'
    jtutup = (Math.floor(Math.random() * 5) + 17).toString() + ':00'
  }

  return day.map((hari) => {
    let status = 'buka',
      buka = jbuka,
      tutup = jtutup

    if (buka24jam) status = 'buka24'
    if (week < 1) {
      if (hari == 'Minggu' || hari == 'Sabtu') {
        status = 'tutup'
        buka = '-'
        tutup = '-'
      }
    }

    return { hari, status, buka, tutup }
  })
}

const getEmail = (nama) => {
  const split = nama.toLowerCase().split(' ')
  const rand = () => Math.floor(Math.random() * split.length)

  let user = nama.toLowerCase().replace(/ /g, '')
  if (split.length > 3) user = split[rand()] + split[rand()] + split[rand()]

  const domain = ['gmail.com', 'yahoo.com', 'ymail.com', getSite(nama)]
  const r = Math.floor(Math.random() * domain.length)

  return user + '@' + domain[r]
}

const getSite = (nama) => {
  const split = nama.toLowerCase().split(' ')
  const rand = () => Math.floor(Math.random() * split.length)

  let user = nama.toLowerCase().replace(/ /g, '')
  if (split.length > 2) user = split[rand()] + split[rand()]

  const domain = ['.com', '.net', '.xyz', '.id', '.co.id']
  const r = Math.floor(Math.random() * domain.length)

  return user + domain[r]
}

const getTelp = () => {
  const d4 = () => Math.floor(Math.random() * 8888) + 1111
  const d3 = () => Math.floor(Math.random() * 888) + 111

  return '0' + d3() + '-' + d3() + '-' + d4()
}

export { jamBuka, getTelp, getSite, getEmail }
