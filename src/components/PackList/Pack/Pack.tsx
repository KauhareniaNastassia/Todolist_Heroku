import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton, styled, TableCell, tableCellClasses, TableRow } from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { PacksType } from '../../../api/cards-API'
import { PATH } from '../../../app/App'
import { DeletePackModal } from '../../../common/Modals/PackModals/DeletePackModal'
import { EditPackModal } from '../../../common/Modals/PackModals/EditPackModal'
import { setCardsTC, setPackIdAC } from '../../../redux/cards-reducer'
import { deletePackTC, updatePackTC } from '../../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import s from '../PackList.module.css'

export const Pack = (props: PacksType) => {
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const onClickSetPack = () => {
    dispatch(
      setCardsTC({
        cardsPack_id: props._id,
        page: page,
        pageCount: pageCount,
        packName: props.name,
      })
    )
    dispatch(setPackIdAC(props._id))
  }

  const StyledTableCellRow = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montseratt',
      fontSize: '15px',
    },
  }))
  const dispatch = useAppDispatch()
  const myID = useAppSelector(state => state.profile._id)

  const deleteButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenDeleteModal(true)
  }

  const deletePack = () => {
    dispatch(deletePackTC(props._id))
  }

  const editButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenEditModal(true)
  }

  const editPackItem = (newName: string) => {
    dispatch(updatePackTC(props._id, newName))
  }

  return (
    <TableRow
      className={s.tableRow}
      key={props._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <StyledTableCellRow onClick={onClickSetPack} className={s.nameColumn}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to={PATH.pack}>
          {props.name}
        </Link>
      </StyledTableCellRow>
      <StyledTableCellRow align="center">{props.cardsCount}</StyledTableCellRow>
      <StyledTableCellRow className={s.lastUpdated} align="center">
        {moment(`${props.updated}`).format('D.M.Y')}
      </StyledTableCellRow>
      <StyledTableCellRow align="center">{props.user_name}</StyledTableCellRow>
      <StyledTableCellRow align="center">
        <IconButton>
          <SchoolIcon></SchoolIcon>
        </IconButton>
        {myID === props.user_id && (
          <span>
            <IconButton onClick={editButtonClickHandler}>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton onClick={deleteButtonClickHandler}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </span>
        )}
        <DeletePackModal
          title="Delete Pack"
          message={`Do you want to delete ${props.name}? All cards will be deleted.`}
          open={openDeleteModal}
          toggleOpenMode={setOpenDeleteModal}
          deleteItem={deletePack}
        />
        <EditPackModal
          itemTitle={props.name}
          title="Edit Pack"
          toggleOpenMode={setOpenEditModal}
          open={openEditModal}
          editItem={editPackItem}
        />
      </StyledTableCellRow>
    </TableRow>
  )
}
