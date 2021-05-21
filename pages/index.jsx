import React, { useState } from 'react'
import Head from 'next/head'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import LoopRoundedIcon from '@material-ui/icons/LoopRounded'
import axios from 'axios'
import Tree from '@naisutech/react-tree'

export default function DirectoryTree() {
  const [url, setUrl] = useState(null)
  const [searching, setSearching] = useState(false)
  const [directories, setDirectories] = useState()

  const handleOnClick = async () => {
    if (url) {
      setSearching(true)
      try {
        await axios
        .get(url)
        .then((res) => {
          res.status == 200 && setDirectories(res.data)
        })
      } catch (error) {
        alert('Ocurrió un error, intente nuevamente')
      } finally {
        setSearching(false)
      }
    } else alert('Ingrese una URL')
  }

  return (
    <>
      <Head children={<title>Arbol de Directorios</title>} />
      <div className="page">
        <div className="input">
          <TextField
            id="outlined-basic"
            label="Ingrese una URL"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div
          className={!searching ? 'iconSearch' : 'iconLoop'}
          onClick={() => handleOnClick()}
        >
          {!searching ? <SearchIcon /> : <LoopRoundedIcon />}
        </div>
      </div>
      {directories ? (
        <div className="tree">
          <Tree
            nodes={directories}
            showEmptyItems
            size="half"
            theme={'light'}
          />
        </div>
      ) : null}
    </>
  )
}
