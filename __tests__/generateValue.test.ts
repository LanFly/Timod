import Timod from '../cjs';

describe('test basic type value', () => {
  it('boolean', () => {
    const basicModel = Timod.define({
      switch: Boolean
    });
    const result = basicModel.parse({ switch: true });
    expect(result).toStrictEqual({ switch: true });
  });

  it('string', () => {
    const basicModel = Timod.define({
      name: String
    });
    const result = basicModel.parse({ name: 'Timod' });
    expect(result).toStrictEqual({ name: 'Timod' });
  });

  it('number', () => {
    const basicModel = Timod.define({
      count: Number
    });
    const result = basicModel.parse({ count: 10 });
    expect(result).toStrictEqual({ count: 10 });
  });

  it('array', () => {
    const basicModel = Timod.define({
      list: [String]
    });
    const result = basicModel.parse({ list: ['Timod', 'timod', 'tmd'] });
    expect(result).toStrictEqual({ list: ['Timod', 'timod', 'tmd'] });
  });

  it('Object', () => {
    const basicModel = Timod.define({
      name: {
        type: String,
        default: 'timod'
      }
    });
    const result = basicModel.parse({ name: 'timod' });
    expect(result).toStrictEqual({ name: 'timod' });
  });
});

describe('test recursive type', () => {
  it('Model -> Model', () => {
    const basicModel = Timod.define({
      age: Number,
      name: String
    });
    const model = Timod.define({
      userInfo: basicModel
    });
    const result = model.parse({ userInfo: { age: 27, name: 'Timod' } });
    expect(result).toStrictEqual({ userInfo: { age: 27, name: 'Timod' } });
  });

  it('Model -> object', () => {
    const model = Timod.define({
      userInfo: {
        type: {
          age: Number,
          name: String
        }
      }
    });
    const result = model.parse({ userInfo: { age: 27, name: 'Timod' } });
    expect(result).toStrictEqual({ userInfo: { age: 27, name: 'Timod' } });
  });
});