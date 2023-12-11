import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { Vehicle } from '../../services/Vehicle';
import { modelStore } from '../../stores/ModelStore';
import { FixMeLater } from '../../types';

class EditForm extends MobxReactForm {
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
        const { name, abrv, image, body_type, transmission, year, engine } = form.values();

        if (typeof image === 'string') {
          const data = {
            name: name,
            abrv: abrv,
            body_type: body_type,
            transmission: transmission,
            year: year,
            engine: engine,
            image: image,
            make_id: modelStore.singleModelId,
          };
          await Vehicle.Model.edit(data);
        } else {
          const url = await Vehicle.Make.uploadFile({
            file: image,
            storageName: `uploads/${name}`,
          });
          const data = {
            name: name,
            abrv: abrv,
            body_type: body_type,
            transmission: transmission,
            year: year,
            engine: engine,
            image: url,
            id: modelStore.singleModelId,
          };
          await Vehicle.Model.edit(data);
        }
        modelStore.cache.clear();
      },
      onError(form: FixMeLater) {
        console.log('All form errors', form.errors());
      },
    };
  }
}

export const editForm = new EditForm();
