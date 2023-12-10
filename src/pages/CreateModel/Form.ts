import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';
import { FixMeLater } from '../../types';
import { modelStore } from '../../store/ModelStore';

class CreateForm extends MobxReactForm {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }
  setup() {
    return {
      fields: [
        {
          name: 'name',
          label: 'Model name ',
          placeholder: 'Add vehicle Model',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'abrv',
          label: 'Abbreviation',
          placeholder: 'Insert abbreviation ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'image',
          label: 'Model image',
          rules: 'required',
          value: '',
        },
        {
          name: 'engine',
          label: 'Model engine type',
          placeholder: 'Insert engine type ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'body_type',
          label: 'Model body type (Sedan,Hatchback...)',
          placeholder: 'Insert model body type  ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'transmission',
          label: 'Model transmission type',
          placeholder: 'Insert model transmission type ',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'year',
          label: 'Model year',
          placeholder: 'Insert model year',
          rules: 'required|numeric',
          value: '',
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form: FixMeLater) => {
        const { name, year, body_type, image, transmission, engine } = form.values();
        const url = await Vehicle.Model.uploadFile({
          file: image,
          storageName: `uploads/${name}`,
        });

        const data = {
          name: name,
          body_type: body_type,
          transmission: transmission,
          year: year,
          engine: engine,
          image: url,
          make_id: modelStore.make_id,
        };

        await Vehicle.Model.create(data);

        form.reset();
        modelStore.cache.clear();
      },
      onError(form: FixMeLater) {
        console.log(form.errors());
      },
    };
  }
}

export const createForm = new CreateForm();
