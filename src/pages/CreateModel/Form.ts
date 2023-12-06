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
          placeholder: 'Insert abbreviation for vehicle model',
          rules: 'required|string|between:1,25',
          value: '',
        },
        {
          name: 'image',
          label: 'Add Model Image',
          placeholder: 'Insert abbreviation for vehicle brand',
          rules: '',
          value: '',
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form: FixMeLater) => {
        const { name, abrv, image } = form.values();
        console.log(typeof image);
        const url = await Vehicle.Model.uploadFile({
          file: image,
          storageName: `uploads/${name}`,
        });

        const data = {
          name: name,
          abrv: abrv,
          image: url,
          make_id: modelStore.make_id,
        };

        await Vehicle.Model.create(data);
        form.reset();
      },
      onError(form: FixMeLater) {
        console.log(form.errors());
      },
    };
  }
}

export const createForm = new CreateForm();
