import React, { useEffect, useState } from "react";
import { Button, Input, Table, TableCell, TableRow } from "semantic-ui-react";
import { getAllData, getDonHangByField, updateData } from "../../../../firebase/firebase";

const DonHang = () => {
  const [donhang, setDonHang] = useState([]);
  const [update, setUpdate] = useState(true)
  const [ngaygui, setNgayGui] = useState('')
  const [phone, setPhone] = useState('')


  useEffect(() => {
    if (update) {
      getDonHang();
      setUpdate(false)
    }
  }, [update]);

  const getDonHang = async () => {
    let response = await getAllData("lienhe");
    if (response.length) {
      setDonHang(response);
    }
  };

  const updateStatus = async (item) => {
    let clonedItem = item;
    clonedItem.lienhe = true
    await updateData(item.id, 'lienhe', clonedItem)
    setUpdate(true)
  }

  const donHangNode = [];
  if (donhang.length) {
    donhang.forEach((item, index) => {
      donHangNode.push(
        <TableRow key={index}>
          <TableCell collapsing={true}>{index + 1}</TableCell>
          <TableCell collapsing>{item.ten}</TableCell>
          <TableCell collapsing={true}>{item.email}</TableCell>
          <TableCell collapsing={true}>{item.diachi}</TableCell>
          <TableCell collapsing={true}>{item.phone}</TableCell>
          <TableCell collapsing={true}>{item.ngaygui}</TableCell>
          <TableCell>{item.tinnhan}</TableCell>
          <TableCell collapsing={true}>
            { item.lienhe ? 
            <span style={{backgroundColor: 'green', color: 'white', padding: '5px'}}><strong>Đã Liên Hệ</strong></span> :
            <Button primary onClick={() => updateStatus(item)}>Đã Liên Hệ</Button>
          }
          </TableCell>
        </TableRow>
      );
    });
  }

  const handleFilter = async (e) => {
    const id = e.currentTarget.id
    let list = [];
    if (id === 'ngaygui' || 'phone') {
      const value = e.currentTarget.value
      if (id === 'ngaygui') setNgayGui(value)
      if (id === 'phone') setPhone(value)
      list = await getDonHangByField(id, value);
    }
    if (id === 'lienhe-true') {
      list = await getDonHangByField('lienhe', true);
    }
    if (id === 'lienhe-false') {
      list = await getDonHangByField('lienhe', false);
    }
    setDonHang(list)
  }

  return (
    <div className={"donhang__container"}>
      <div
        style={{
          display: "flex",
          margin: "3rem",
          alignItems: 'center'
        }}
      >
        <Input label={"Tìm theo Ngày yêu cầu"} style={{width: '30%', marginRight: '3rem', fontSize: '1.2rem'}} onChange={handleFilter} value={ngaygui} id={'ngaygui'}/>
        <Input label={"Tìm theo SĐT"} style={{width: '30%', marginRight: '3rem', fontSize: '1.2rem'}} onChange={handleFilter} value={phone} id={'phone'}/>
        <div>
          <Button primary id={'lienhe-false'} onClick={handleFilter} style={{fontSize: '1em'}}>Chưa Liên Hệ</Button>
          <Button primary id={'lienhe-true'} onClick={handleFilter} style={{fontSize: '1em'}}>Đã Liên Hệ</Button>
          <Button primary id={'lienhe-true'} onClick={() => setUpdate(true)} style={{fontSize: '1em'}}>Tất Cả</Button>
        </div>
      </div>
      <Table celled id={"donhang_tbl"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{""}</Table.HeaderCell>
            <Table.HeaderCell>Tên</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Địa Chỉ</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Ngày Yêu Cầu</Table.HeaderCell>
            <Table.HeaderCell>Yêu Cầu</Table.HeaderCell>
            <Table.HeaderCell>Theo Dõi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{donHangNode}</Table.Body>

        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    </div>
  );
};

export default DonHang;
