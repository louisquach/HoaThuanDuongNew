"use client";

import { useEffect, useState } from "react";
import { Button, Input, Table, TableCell, TableRow } from "semantic-ui-react";
import { getAllData, getDonHangByField, updateData } from "@/lib/firebase";
import PrivateLayout from "@/components/PrivateLayout";

export default function DonHangContent() {
  const [donhang, setDonHang] = useState([]);
  const [update, setUpdate] = useState(true);
  const [ngaygui, setNgayGui] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (update) {
      getDonHangList();
      setUpdate(false);
    }
  }, [update]);

  const getDonHangList = async () => {
    let response = await getAllData("lienhe");
    if (response.length) {
      setDonHang(response);
    }
  };

  const updateStatus = async (item) => {
    let clonedItem = { ...item, lienhe: true };
    await updateData(item.id, "lienhe", clonedItem);
    setUpdate(true);
  };

  const handleFilter = async (e) => {
    const id = e.currentTarget.id;
    let list = [];
    if (id === "ngaygui" || id === "phone") {
      const value = e.currentTarget.value;
      if (id === "ngaygui") setNgayGui(value);
      if (id === "phone") setPhone(value);
      list = await getDonHangByField(id, value);
    }
    if (id === "lienhe-true") {
      list = await getDonHangByField("lienhe", true);
    }
    if (id === "lienhe-false") {
      list = await getDonHangByField("lienhe", false);
    }
    setDonHang(list);
  };

  return (
    <PrivateLayout>
      <div className="donhang__container">
        <div style={{ display: "flex", margin: "3rem", alignItems: "center" }}>
          <Input
            label="Tìm theo Ngày yêu cầu"
            style={{ width: "30%", marginRight: "3rem", fontSize: "1.2rem" }}
            onChange={handleFilter}
            value={ngaygui}
            id="ngaygui"
          />
          <Input
            label="Tìm theo SĐT"
            style={{ width: "30%", marginRight: "3rem", fontSize: "1.2rem" }}
            onChange={handleFilter}
            value={phone}
            id="phone"
          />
          <div>
            <Button primary id="lienhe-false" onClick={handleFilter} style={{ fontSize: "1em" }}>
              Chưa Liên Hệ
            </Button>
            <Button primary id="lienhe-true" onClick={handleFilter} style={{ fontSize: "1em" }}>
              Đã Liên Hệ
            </Button>
            <Button primary onClick={() => setUpdate(true)} style={{ fontSize: "1em" }}>
              Tất Cả
            </Button>
          </div>
        </div>
        <Table celled id="donhang_tbl">
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
          <Table.Body>
            {donhang.map((item, index) => (
              <TableRow key={index}>
                <TableCell collapsing>{index + 1}</TableCell>
                <TableCell collapsing>{item.ten}</TableCell>
                <TableCell collapsing>{item.email}</TableCell>
                <TableCell collapsing>{item.diachi}</TableCell>
                <TableCell collapsing>{item.phone}</TableCell>
                <TableCell collapsing>{item.ngaygui}</TableCell>
                <TableCell>{item.tinnhan}</TableCell>
                <TableCell collapsing>
                  {item.lienhe ? (
                    <span style={{ backgroundColor: "green", color: "white", padding: "5px" }}>
                      <strong>Đã Liên Hệ</strong>
                    </span>
                  ) : (
                    <Button primary onClick={() => updateStatus(item)}>
                      Đã Liên Hệ
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </Table.Body>
        </Table>
      </div>
    </PrivateLayout>
  );
}
