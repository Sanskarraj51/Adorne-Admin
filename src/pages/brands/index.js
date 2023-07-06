import { Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useState } from 'react'
import OptionsMenu from 'src/@core/components/option-menu'
import { rows } from 'src/@fake-db/table/static-data'
import Icon from 'src/@core/components/icon'


const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Name'
  },

  {
    flex: 0.15,
    minWidth: 120,
    field: 'statis',
    headerName: 'Status'
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Delete Invoice'>
          <IconButton size='small'>
            <Icon icon='mdi:delete-outline' fontSize={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title='View'>
          <IconButton size='small' component={Link} href={`/apps/invoice/preview/${row.id}`}>
            <Icon icon='mdi:eye-outline' fontSize={20} />
          </IconButton>
        </Tooltip>
        <OptionsMenu
          iconProps={{ fontSize: 20 }}
          iconButtonProps={{ size: 'small' }}
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          options={[
            {
              text: 'Download',
              icon: <Icon icon='mdi:download' fontSize={20} />
            },
            {
              text: 'Edit',
              href: `/apps/invoice/edit/${row.id}`,
              icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
            },
            {
              text: 'Duplicate',
              icon: <Icon icon='mdi:content-copy' fontSize={20} />
            }
          ]}
        />
      </Box>
    )
  }
]

const BrandsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  return (
    <Card>
      <CardHeader
        title='Brands Page'
        action={
          <Link href='brands/add'>
            <Button variant='contained'>Add Brands</Button>
          </Link>
        }
      />
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rows}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />{' '}
      </CardContent>
    </Card>
  )
}

export default BrandsPage

