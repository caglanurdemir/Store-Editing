import { Button, Input, Modal, Table, Typography, Divider } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import "./App.css";

interface AppProps { }

interface AppState {
  data?: Array<Store>;
  isDetailVisible: boolean;
  isUpdateFormVisible: boolean;
  isCreateModalVisible: boolean;
  selectedStore?: Store | undefined;
}

interface Store {
  storeId: number,
  storeName: string,
  storeSlug?: string,
  storeTitle?: string,
  memberId: number,
  storeLogoURL: string,
  storeDesc?: string,
  displayLogo?: number,
  storeOnWait?: string,
  storeType?: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isDetailVisible: false,
      isUpdateFormVisible: false,
      isCreateModalVisible: false
    }
  }

  componentDidMount() {
    axios.get(`http://www.mocky.io/v2/5e4c202b310000e1cad8bcda`).then((res) => {
      let storeArray: Store[] = Object.values(res.data);
      this.setState({ data: storeArray });
    })
  }

  columns = [
    {
      title: 'Görseli',
      dataIndex: 'storeLogoURL',
      key: 'storeLogoURL',
      render: (storeLogoURL: string) => (
        <>
          <img alt="storeLogoURL" src={storeLogoURL} />
        </>
      ),
    },
    {
      title: 'Adı',
      dataIndex: 'storeName',
      key: 'storeName'
    },
    {
      title: 'Müşteri Kodu',
      dataIndex: 'memberId',
      key: 'memberId'
    },
    {
      title: 'Açıklaması',
      dataIndex: 'storeDesc',
      key: 'storeDesc'
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Store) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              this.setState({
                isDetailVisible: true,
                selectedStore: record
              })
            }}>Detay</Button>
          <Divider type={"vertical"}></Divider>

          <Button
            type="link"
            onClick={() => {
              this.setState({
                isUpdateFormVisible: true,
                selectedStore: record
              })
            }}>Güncelle</Button>

          <Divider type={"vertical"}></Divider>

          <Button
            type="link"
            onClick={() => this.removeStore(record)}>Sil</Button>
        </span>
      )
    }
  ];

  removeStore(record: Store) {
    let newState = this.state.data;
    if (newState) {
      newState.splice(newState.indexOf(record), 1);
      this.setState({ data: newState });
    }
  }

  getDetailModal() {
    const { selectedStore } = this.state;
    return (
      <>
        <div className="mb-16">
          <Typography.Text>Store ID</Typography.Text>
          <h1>{selectedStore?.storeId}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Member ID</Typography.Text>
          <h1>{selectedStore?.memberId}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store Name</Typography.Text>
          <h1>{selectedStore?.storeName}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store Slug</Typography.Text>
          <h1>{selectedStore?.storeSlug}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store Title</Typography.Text>
          <h1>{selectedStore?.storeTitle}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store Description</Typography.Text>
          <h1>{selectedStore?.storeDesc}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store Type</Typography.Text>
          <h1>{selectedStore?.storeType}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store On Wait</Typography.Text>
          <h1>{selectedStore?.storeOnWait}</h1>
        </div>
        <div className="mb-16">
          <Typography.Text>Store Logo</Typography.Text>
          <div>
            <img src={selectedStore?.storeLogoURL} />
          </div>
        </div>
        <div className="mb-16">
          <Typography.Text>Display Logo</Typography.Text>
          <h1>{selectedStore?.displayLogo}</h1>
        </div>
      </>
    )
  };

  getUpdateModal() {
    const { selectedStore } = this.state;
    if (selectedStore) {
      let updatedStore: Store = { ...selectedStore };
      return (
        <>
          <div className="mb-16">
            <Typography.Text>Store ID</Typography.Text>
            <h1>{selectedStore.storeId}</h1>
          </div>

          <div className="mb-16">
            <Typography.Text>Member ID</Typography.Text>
            <h1>{selectedStore.memberId}</h1>
          </div>

          <div className="mb-16">
            <Typography.Text>Store Name</Typography.Text>
            <Input placeholder={selectedStore.storeName} onChange={(e) => {
              updatedStore.storeName = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Store Slug</Typography.Text>
            <Input placeholder={selectedStore.storeSlug} onChange={(e) => {
              updatedStore.storeSlug = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Store Title</Typography.Text>
            <Input placeholder={selectedStore.storeTitle} onChange={(e) => {
              updatedStore.storeTitle = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Store Description</Typography.Text>
            <Input placeholder={selectedStore.storeDesc} onChange={(e) => {
              updatedStore.storeDesc = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Store Type</Typography.Text>
            <Input placeholder={selectedStore?.storeType} onChange={(e) => {
              updatedStore.storeType = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Store On Wait</Typography.Text>
            <Input placeholder={selectedStore.storeOnWait} onChange={(e) => {
              updatedStore.storeOnWait = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Store Logo URL</Typography.Text>
            <Input placeholder={selectedStore.storeLogoURL} type="url" onChange={(e) => {
              updatedStore.storeLogoURL = e.target.value;
            }} />
          </div>

          <div className="mb-16">
            <Typography.Text>Display Logo</Typography.Text>
            <Input placeholder={selectedStore.displayLogo?.toString()} type="number" onChange={(e) => {
              updatedStore.displayLogo = Number(e.target.value);
            }} />
          </div>

          <Button type="primary" onClick={() => {
            const { data, selectedStore } = this.state;
            if (data && selectedStore) {
              let newDataList = [...data];
              let indexToChange = data?.indexOf(selectedStore);
              newDataList[indexToChange] = updatedStore;
              this.setState({
                data: newDataList,
                isUpdateFormVisible: false,
                selectedStore: undefined
              })
            }
          }}>Mağaza bilgilerini güncelle</Button>
        </>
      )
    }
    return
  };

  getCreateModal() {
    let storeToSave: Partial<Store> = {};
    return (
      <>
        <div className="mb-16">
          <Typography.Text>Store ID</Typography.Text>
          <Input type="number" onChange={(e) => {
            storeToSave.storeId = Number(e.target.value)
          }} />
        </div>
        <div className="mb-16">
          <Typography.Text>Member ID</Typography.Text>
          <Input type="number" onChange={(e) => {
            storeToSave.memberId = Number(e.target.value)
          }} />
        </div>
        <div className="mb-16">
          <Typography.Text>Store Name</Typography.Text>
          <Input onChange={(e) => {
            storeToSave.storeName = e.target.value
          }} />
        </div>
        <div className="mb-16">
          <Typography.Text>Image URL</Typography.Text>
          <Input onChange={(e) => {
            storeToSave.storeLogoURL = e.target.value
          }} />
        </div>

        <Button type="primary" onClick={() => {
          const { data } = this.state;
          if (data) {
            let newDataList = [...data];
            newDataList.push(storeToSave as Store);
            this.setState({
              data: newDataList,
              isCreateModalVisible: false
            })
          }
        }}>Mağazayı kaydet</Button>
      </>
    )
  }


  render() {
    return (
      <>
        <Table columns={this.columns} dataSource={this.state.data} />
        <Modal
          title="Mağaza Detayları"
          visible={this.state.isDetailVisible}
          onOk={() => {
            this.setState({ isDetailVisible: false })
          }}
          onCancel={() => {
            this.setState({ isDetailVisible: false })
          }}
          cancelButtonProps={{
            style: {
              display: "none"
            }
          }}
        >
          {this.getDetailModal()}
        </Modal>

        <Modal
          title="Mağaza Güncelleme"
          visible={this.state.isUpdateFormVisible}
          onCancel={() => {
            this.setState({ isUpdateFormVisible: false })
          }}
          okButtonProps={{
            style: {
              display: "none"
            }
          }}
          cancelButtonProps={{
            style: {
              display: "none"
            }
          }}
        >
          {this.getUpdateModal()}
        </Modal>

        <Modal
          title="Mağaza Ekle"
          visible={this.state.isCreateModalVisible}
          onCancel={() => {
            this.setState({ isCreateModalVisible: false })
          }}
          okButtonProps={{
            style: {
              display: "none"
            }
          }}
          cancelButtonProps={{
            style: {
              display: "none"
            }
          }}
        >
          {this.getCreateModal()}
        </Modal>
        <Button type="primary" onClick={() => {
          this.setState({
            isCreateModalVisible: true
          });
        }}>Yeni mağaza ekle</Button>
      </>
    )
  }
}

export default App;
