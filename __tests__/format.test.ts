import Timod from '../cjs';

describe('test format', () => {
  it('test basic type format', () => {
    const basicModel = Timod.define({
      time: {
        type: String,
        format: (value) => {
          const date = new Date(value);
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
      }
    });
    const result = basicModel.parse({ time: 1621497012074 });
    expect(result).toStrictEqual({ time: '2021-5-20' });
  });

  it('test Model type format', () => {
    const basicModel = Timod.define({
      age: {
        type: Number,
        format: (value) => {
          return +value;
        }
      },
      name: {
        type: String,
        format: (value) => {
          return value.substr(0, 1) + '**';
        }
      }
    });
    const model = Timod.define({
      userInfo: basicModel
    });
    const result = model.parse({
      userInfo: {
        age: '27',
        name: 'Timod'
      }
    });
    expect(result).toStrictEqual({ userInfo: { age: 27, name: 'T**' } });
  });

  it('test Object type format', () => {
    const model = Timod.define({
      userInfo: {
        type: {
          age: {
            type: Number,
            format: (value) => {
              return +value;
            }
          },
          name: {
            type: String,
            format: (value) => {
              return value.substr(0, 1) + '**';
            }
          }
        }
      }
    });
    const result = model.parse({
      userInfo: {
        age: '27',
        name: 'Timod'
      }
    });
    expect(result).toStrictEqual({ userInfo: { age: 27, name: 'T**' } });
  });
});
