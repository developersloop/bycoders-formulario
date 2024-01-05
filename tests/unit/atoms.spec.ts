import { shallowMount } from "@vue/test-utils";
import AtomButton from "@/components/atoms/AtomButton.vue";
import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomHeader from "@/components/atoms/AtomHeader.vue";

const mockRouter = {
  currentRoute: {
    value: {
      name: "step-one",
    },
  },
  push: jest.fn(),
};
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(AtomButton, {
      props: { label: "Cadastrar" },
    });

    expect(wrapper.props()).toEqual(
      expect.objectContaining({ label: "Cadastrar" })
    );
  });

  it("renders atom input and persist value props", () => {
    const wrapper = shallowMount(AtomInput, {
      props: { name: "text" },
    });

    const input = wrapper.find("input");
    input.setValue("valor testado");

    expect(input.element.value).toEqual("valor testado");
    expect(wrapper.emitted()).toHaveProperty("input");
  });

  it("renders type route when text element", () => {
    const wrapper = shallowMount(AtomHeader, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.text()).toEqual("Seja Bem vindo (a)");
  });
});
