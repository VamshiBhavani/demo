import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Typography } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const TransactionForm = () => {
  const handleResize = () => {
    const container = document.getElementById('container');
    const items = document.getElementById('items');

    if (window.matchMedia("(max-width: 426px)").matches) {
      container.style.height = 'fit-content';
      items.style.width = '100%';
    } else if
      (window.matchMedia("(max-width: 769px)").matches) {
      //container.style.height = 'fit-content';
      items.style.width = '90%';
    } else {
      container.style.height = '100vh';
      items.style.width = '50%';
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onFinish = async (values) => {

    const now = new Date();
    const dateTime = now.toISOString();
    console.log("Current date and time:", dateTime);
    values.dateOfPayment = dateTime;
    
    console.log(values)

    await axios.post('......', values)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

const formItems = [
  {
    label: "ItemName",
    name: "itemName",
    rules: [{ whitespace: false, required: true, message: "Please enter the Item Name" }],
    component: <Input placeholder="Item Name " />
  },
  {
    label: "Description",
    name: "description",
    rules: [{ whitespace: false, required: true, message: "Please enter the description" }],
    component: <TextArea placeholder="Description" />

  }, {
    label: 'Category',
    name: 'category',
    rules: [{ required: true, message: 'Please select a category' }],
    component: (
      <Select placeholder="Please select Category">
        <Option value="Library Membership">Administration</Option>
        <Option value="Water">Library</Option>
        <Option value="Stationary Parchase">Stationary</Option>
        <Option value="Electricity">Salaries</Option>
        <Option value="Rent"> Maintenance</Option>
        <Option value="Student Fee">Others</Option>
      </Select>
    ),
  },
  {
    label: 'Mode Of Payment',
    name: 'modeOfPayment',
    rules: [{ required: true, message: 'Please select payment mode' }],
    type: 'string',
    component: (
      <Select placeholder="Please select payment mode">
        <Option value="Phone_Pay"> Phone Pay</Option>
        <Option value="Google_Pay">Google Pay</Option>
        <Option value="Paytm">Paytm</Option>
        <Option value="Cred">Cred</Option>
        <Option value="Bank_Transfer">Bank Transfer</Option>
        <Option value="Card">Card</Option>
        <Option value="Internet_Backend">Internet Banking</Option>
        <Option value="Cash">Cash</Option>
      </Select>),
  },
  {
    label: 'Transaction Mode',
    name: 'transactionMode',
    rules: [{ required: true, message: 'Please select Transaction Mode' }],
    component: (
      <Select placeholder="Please  Transaction Mode">
        <Option value="Credit">Credit</Option>
        <Option value="Debit">Debit</Option>
      </Select>
    )
  },
  {
    label: "Amount",
    name: "amount",
    rules: [{ whitespace: false, pattern: /^[0-9]/, required: true, message: "Please enter Amount" }],
    component: <Input placeholder="0.00" suffix="₹ /- " />
  },

]
return (
  <div id="container" style={{ height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#c7c9c1' }}>
    <Form onFinish={onFinish} id="items" style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 1)', width: '50%', borderRadius: '10px', padding: '1px 30px', backgroundColor: 'white' }}>
      <Title level={1}>Transaction Recept</Title>
      {formItems.map((item, index) => (
        <Form.Item
          key={index}
          label={item.label}
          name={item.name}
          rules={item.rules}
          labelCol={{ xs: { span: 24 }, sm: { span: 24 }, lg: { span: 8 }, xl: { span: 5 }, xxl: { span: 4 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, lg: { span: 16 }, xl: { span: 19 }, xxl: { span: 20 } }}
          labelAlign="left"
        >
          {item.component}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  </div>
);
}
export default TransactionForm;


// // // --itemName String
// // // --  description String
// // // --  category String // Library Membership, Stationary Parchase, Stationary Sale, Electricity, Salaries, Rent, Student Fee, Water, Maintenance
// // //   dateOfPayment DateTime
// // //  -- amount Int
// // //  -- modeOfPayment String // Phone Pay, Google Pay, Paytm, Cred, Bank Transfer, Card, Cash
// // //  -- transactionMode String // Debit, Credit


