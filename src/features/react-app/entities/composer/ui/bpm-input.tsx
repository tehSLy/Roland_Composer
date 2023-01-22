import { useStore } from 'effector-react';
import { appModel } from '../../../../AppModel/createAppModel';
import { Input } from '../../../shared/ui/input';

export const BpmInput = () => {
  const bpm = useStore(appModel.deviceModel._bpm.position);

  return (
    <Input
      value={bpm}
      type="number"
      width="16"
      onChange={(event) =>
        appModel.deviceModel._bpm.setPosition(Number(event.currentTarget.value))
      }
    />
  );
};
