import Timod from '../cjs';

describe('test mapto', () => {
  it('test basic type mapto', () => {
    const basicModel = Timod.define({
      switch: {
        type: Boolean,
        default: true,
        mapto: 'poweron'
      }
    });
    const result = basicModel.parse({
      switch: true,
      poweron: false
    });
    expect(result).toStrictEqual({ switch: false });
  });

  it('test object type mapto', () => {
    const model = Timod.define({
      userInfo: {
        type: {
          age: Number,
          name: String
        },
        mapto: 'useInfo'
      }
    });
    const result = model.parse({
      useInfo: { age: 27, name: 'Timod' }
    });
    expect(result).toStrictEqual({
      userInfo: { age: 27, name: 'Timod' }
    });
  });

  it('test Model type mapto', () => {
    const basicModel = Timod.define({
      age: Number,
      name: String
    });
    const model = Timod.define({
      userInfo: {
        type: basicModel,
        mapto: 'useInfo'
      }
    });
    const result = model.parse({
      useInfo: { age: 27, name: 'Timod' }
    });
    expect(result).toStrictEqual({
      userInfo: { age: 27, name: 'Timod' }
    });
  });

  it('test recursive mapto', () => {
    const basicModel = Timod.define({
      age: {
        type: Number,
        mapto: 'year'
      },
      name: {
        type: String,
        mapto: 'nickname'
      }
    });
    const model = Timod.define({
      userInfo: {
        type: basicModel,
        mapto: 'useInfo'
      }
    });
    const result = model.parse({
      useInfo: { year: 27, nickname: 'Timod' }
    });
    expect(result).toStrictEqual({
      userInfo: { age: 27, name: 'Timod' }
    });
  });
});
