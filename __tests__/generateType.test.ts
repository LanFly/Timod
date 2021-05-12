import Timod from '../dist/timod.umd';

describe('test basic type', () => {
  it('boolean', () => {
    const basicModel = Timod.define({
      switch: Boolean
    });
    expect(basicModel.definition.switch).toEqual(
      expect.objectContaining({
        type: 'Boolean',
        construct: Boolean,
        default: null,
        format: null,
        mapto: null
      })
    );
  });

  it('string', () => {
    const basicModel = Timod.define({
      name: String
    });
    expect(basicModel.definition.name).toEqual(
      expect.objectContaining({
        type: 'String',
        construct: String,
        default: null,
        format: null,
        mapto: null
      })
    );
  });

  it('number', () => {
    const basicModel = Timod.define({
      count: Number
    });
    expect(basicModel.definition.count).toEqual(
      expect.objectContaining({
        type: 'Number',
        construct: Number,
        default: null,
        format: null,
        mapto: null
      })
    );
  });

  it('array', () => {
    const basicModel = Timod.define({
      list: [String]
    });
    expect(basicModel.definition.list).toEqual(
      expect.objectContaining({
        type: 'Array',
        construct: String,
        default: null,
        format: null,
        mapto: null
      })
    );
  });

  it('Model', () => {
    const basicModel = Timod.define({
      age: Number,
      name: String
    });
    const model = Timod.define({
      userInfo: basicModel
    });
    expect(model.definition.userInfo).toEqual(
      expect.objectContaining({
        type: 'Model',
        construct: {
          definition: {
            age: {
              type: 'Number',
              construct: Number,
              default: null,
              format: null,
              mapto: null
            },
            name: {
              type: 'String',
              construct: String,
              default: null,
              format: null,
              mapto: null
            }
          }
        },
        default: null,
        format: null,
        mapto: null
      })
    );
  });

  it('object', () => {
    const basicModel = Timod.define({
      name: {
        type: String,
        default: 'timod'
      }
    });
    expect(basicModel.definition.name).toEqual(
      expect.objectContaining({
        type: 'String',
        construct: String,
        default: 'timod',
        format: null,
        mapto: null
      })
    );
  });
});

describe('test recursive type', () => {
  it('object->basic', () => {
    const model = Timod.define({
      userInfo: {
        type: {
          age: Number,
          name: String
        }
      }
    });
    expect(model.definition.userInfo).toEqual(
      expect.objectContaining({
        type: 'Model',
        construct: {
          definition: {
            age: {
              type: 'Number',
              construct: Number,
              default: null,
              format: null,
              mapto: null
            },
            name: {
              type: 'String',
              construct: String,
              default: null,
              format: null,
              mapto: null
            }
          }
        },
        default: null,
        format: null,
        mapto: null
      })
    );
  });
});
