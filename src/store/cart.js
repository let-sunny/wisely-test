// initial state
const state = {
  productList: [
    {
      id: 1,
      name: "면도기 세트",
      options: [
        {
          id: 1,
          name: "미드나잇 네이비",
          color: "navy",
          description:
            "<span style='color: #000000'>네이비</span> 핸들 + 면도날 2개입",
          thumbnail: require("@/assets/images/product/razor_navy.png"),
          productThumbnail: require("@/assets/images/product/item_razor_set_navy.png")
        },
        {
          id: 2,
          name: "사파이어 블루",
          color: "blue",
          description:
            "<span style='color: #3A81C1'>블루</span> 핸들 + 면도날 2개입",
          thumbnail: require("@/assets/images/product/razor_blue.png"),
          productThumbnail: require("@/assets/images/product/item_razor_set_blue.png")
        },
        {
          id: 3,
          name: "슬레이트 그레이",
          color: "grey",
          description:
            "<span style='color: #858585'>그레이 핸들</span> + 면도날 2개입",
          thumbnail: require("@/assets/images/product/razor_grey.png"),
          productThumbnail: require("@/assets/images/product/item_razor_set_grey.png")
        }
      ],
      description: "면도기 핸들+면도날 2개입",
      price: "8900",
      isFreeShipping: true,
      hasOptionModal: true,
      thumbnail: require("@/assets/images/product/item_razor_set.png"),
      orderNo: 0,
      hasSubscription: false,
      isSubscriptionStandard: false
    },
    {
      id: 2,
      name: "리필 면도날",
      options: [],
      description: "면도날 4개입",
      price: "9600",
      isFreeShipping: false,
      thumbnail: require("@/assets/images/product/item_blade.png"),
      orderNo: 1,
      hasSubscription: true,
      isSubscriptionStandard: true
    },
    {
      id: 3,
      name: "쉐이빙 젤",
      options: [],
      description: "스탠다드 150ml",
      price: "4500",
      isFreeShipping: false,
      thumbnail: require("@/assets/images/product/item_shaving_gel.png"),
      orderNo: 2,
      hasSubscription: true,
      isSubscriptionStandard: false
    },
    {
      id: 4,
      name: "리페어 애프터쉐이브",
      options: [],
      description: "스탠다드 60ml",
      price: "3900",
      isFreeShipping: false,
      thumbnail: require("@/assets/images/product/item_aftershave.png"),
      orderNo: 3,
      hasSubscription: true,
      isSubscriptionStandard: false
    }
  ],
  selectedList: []
};

// getters
const getters = {
  count: state =>
    state.selectedList.reduce(
      (accumulatedValue, selectedItem) => accumulatedValue + selectedItem.count,
      0
    ),
  totalPrice: state =>
    state.selectedList.reduce(
      (accumulatedValue, selectedItem) =>
        accumulatedValue + selectedItem.count * selectedItem.price,
      0
    )
};

// actions
const actions = {
  addItem({ commit, state }, item) {
    const selectedItem = state.selectedList.find(
      selectedItem => selectedItem.id === item.id
    );
    let description = item.description;
    let thumbnail = item.thumbnail;
    if (item.selectedOptionId) {
      const option = item.options.find(
        option => option.id === item.selectedOptionId
      );
      description = option ? option.description : item.description;
      thumbnail = option ? option.productThumbnail : item.thumbnail;
    }
    if (!selectedItem) {
      commit("SET_SELECTED_LIST", [
        ...state.selectedList,
        {
          ...item,
          count: 1,
          description,
          thumbnail
        }
      ]);
    }
  },
  async removeItem({ commit, state, dispatch }, item) {
    const index = await dispatch("getSelectedItemIndex", item.id);
    const newSelectedList = [...state.selectedList];
    newSelectedList.splice(index, 1);
    commit("SET_SELECTED_LIST", newSelectedList);
  },
  async addCount({ commit, dispatch }, item) {
    const index = await dispatch("getSelectedItemIndex", item.id);
    const newSelectedList = [...state.selectedList];
    newSelectedList.splice(index, 1, {
      ...item,
      count: item.count + 1
    });
    commit("SET_SELECTED_LIST", newSelectedList);
  },
  async subCount({ commit, dispatch }, item) {
    const count = item.count - 1;
    if (count >= 1) {
      const index = await dispatch("getSelectedItemIndex", item.id);
      const newSelectedList = [...state.selectedList];
      newSelectedList.splice(index, 1, {
        ...item,
        count: item.count - 1
      });
      commit("SET_SELECTED_LIST", newSelectedList);
    }
  },
  async selectSubscriptionCycle({ commit, dispatch }, { item, cycle }) {
    const index = await dispatch("getSelectedItemIndex", item.id);
    const newSelectedList = [...state.selectedList];
    newSelectedList.splice(index, 1, {
      ...item,
      cycle
    });
    commit("SET_SELECTED_LIST", newSelectedList);
  },
  getSelectedItemIndex({ state }, id) {
    return state.selectedList.findIndex(selectedItem => selectedItem.id === id);
  }
};

// mutations
const mutations = {
  SET_SELECTED_LIST(state, newVal) {
    state.selectedList = newVal;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
