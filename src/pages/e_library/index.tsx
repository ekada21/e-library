import { Box, Flex } from '@chakra-ui/react'
import Filter from '../../components/shared_components/filter' 
import { useRef, useState } from 'react';
import Partnertable from '../../components/elibrary_components/partnertable';
import Pagination from '../../components/shared_components/pagination';
// import React from 'react'

interface Props { }

function Elibrary(props: Props) {
    const { } = props

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalItem, setTotalItem] = useState(0)

    const tableRef: any = useRef();
    
    return (
        <Flex width={"full"} h={"full"} flexDir={"column"} >
            <Filter tableRef={tableRef} />
            <Partnertable setLimit={setLimit} setPage={setPage} setTotal={setTotalItem} limit={limit} page={page} />
            <Box mt={"auto"} pt={"12"} > 
                <Pagination  setLimit={setLimit} setPage={setPage} setTotal={setTotalItem} limit={limit} page={page} totalItem={totalItem}  />
            </Box>
        </Flex>
    )
}

export default Elibrary
