// libraries
import { date } from 'quasar';
import { defineStore } from 'pinia';
import { PhaseType } from '../components/types/Challenge';

// composables
import { useApiGetCampaign } from '../composables/useApiGetCampaign';

// utils
import { timestampToDatetimeString } from 'src/utils';
import { getCurrentPriceLevelsUtil } from '../utils/price_levels';

// enums
import {
  ChallengeStatus,
  PriceLevelCategory,
} from '../components/enums/Challenge';

// types
import type { Logger } from '../components/types/Logger';
import type { Phase, PriceLevel } from '../components/types/Challenge';

export const useChallengeStore = defineStore('challenge', {
  state: () => ({
    // property set in pinia.js boot file
    $log: null as Logger | null,
    isChallengeActive: true,
    /**
     * Phase set for the current campaign
     * Phase object with id `registration` marks the ability to register.
     * Phase object with id `competition` marks the duration of the challenge.
     * Phase object with id `entry_enabled` marks the ability to log routes.
     * Phase object with id `payment` marks the ability to pay.
     * Phase object with id `invoices` marks the ability to see invoices.
     */
    phaseSet: [] as Phase[],
    daysActive: null as number | null,
    maxTeamMembers: null as number | null,
    priceLevel: [] as PriceLevel[],
  }),

  getters: {
    /**
     * Returns the status of the current challenge
     * This determines the stage the challenge is in.
     * @see {ChallengeStatus} enum for possible values.
     * @returns {ChallengeStatus}
     */
    getChallengeStatus: (): ChallengeStatus => {
      const thisStore = useChallengeStore();
      if (thisStore.getIsChallengeInPhase(PhaseType.competition)) {
        return ChallengeStatus.during;
      } else if (thisStore.getIsChallengeInPhase(PhaseType.registration)) {
        return ChallengeStatus.before;
      }
      return ChallengeStatus.after;
    },
    getPhaseSet(): Phase[] {
      return this.phaseSet;
    },
    getDaysActive(): number | null {
      return this.daysActive;
    },
    getMaxTeamMembers(): number | null {
      return this.maxTeamMembers;
    },
    getPriceLevel(): PriceLevel[] {
      return this.priceLevel;
    },
    getCurrentPriceLevels(): Record<PriceLevelCategory, PriceLevel> {
      return getCurrentPriceLevelsUtil(this.priceLevel);
    },
    getCompetitionStart: (state) => {
      const competitionPhase = state.phaseSet.find(
        (phase) => phase.phase_type === PhaseType.competition,
      );
      return competitionPhase?.date_from || '';
    },
    getEntryPhaseEnd: (state) => {
      const entryPhase = state.phaseSet.find(
        (phase) => phase.phase_type === PhaseType.entryEnabled,
      );
      return entryPhase?.date_to || '';
    },
  },

  actions: {
    setMaxTeamMembers(maxTeamMembers: number | null): void {
      this.maxTeamMembers = maxTeamMembers;
    },
    setPriceLevel(priceLevel: PriceLevel[]): void {
      this.priceLevel = priceLevel;
    },
    setDaysActive(daysActive: number | null): void {
      this.daysActive = daysActive;
    },
    setPhaseSet(phaseSet: Phase[]): void {
      this.phaseSet = phaseSet;
    },
    async loadPhaseSet(): Promise<void> {
      const { campaigns, loadCampaign } = useApiGetCampaign(this.$log);
      await loadCampaign();
      if (campaigns.value.length && campaigns.value[0]?.phase_set) {
        this.$log?.debug(
          `Saving phase set <${JSON.stringify(campaigns.value[0].phase_set, null, 2)}>.`,
        );
        this.setPhaseSet(campaigns.value[0].phase_set);
        this.$log?.debug(
          `New phase set <${JSON.stringify(this.getPhaseSet, null, 2)}>.`,
        );
      } else {
        this.$log?.debug('No phase set found.');
      }

      if (campaigns.value.length && campaigns.value[0]?.days_active) {
        this.$log?.debug(
          `Set store this campaign active days value <${campaigns.value[0].days_active}>.`,
        );
        this.setDaysActive(campaigns.value[0].days_active);
        this.$log?.debug(
          `New this camapaing active days value <${this.daysActive}>.`,
        );
      } else {
        this.$log?.info('No this campaign active days found.');
      }

      if (campaigns.value.length && campaigns.value[0]?.max_team_members) {
        this.$log?.debug(
          `Set store this campaing max team members <${campaigns.value[0].max_team_members}>.`,
        );
        this.setMaxTeamMembers(campaigns.value[0].max_team_members);
        this.$log?.debug(
          `New this campaing max team members value <${this.maxTeamMembers}>.`,
        );
      } else {
        this.$log?.info('No this campaign max team members found.');
      }

      if (campaigns.value.length && campaigns.value[0]?.price_level) {
        this.$log?.debug(
          `Set store this campaign price level <${campaigns.value[0].price_level}>.`,
        );
        this.setPriceLevel(campaigns.value[0].price_level);
      } else {
        this.$log?.info('No this campaign price level found.');
      }
    },
    /**
     * Checks if challenge is in a given phase
     * Returns true if now is within the phase dates
     * Returns false if now is not within the phase dates
     * or if the phase is not found in the phase set
     * @param {PhaseType} phaseType - Phase type to check
     * @returns {boolean}
     */
    getIsChallengeInPhase(phaseType: PhaseType): boolean {
      this.$log?.debug(`Checking if challenge is in <${phaseType}> phase.`);
      const phase = this.getPhaseFromSet(phaseType);
      if (phase) {
        const startDate: Date = new Date(phase.date_from);
        this.$log?.debug(
          `<${phaseType}> phase date from <${timestampToDatetimeString(startDate.getTime() / 1000)}>.`,
        );
        const now: Date = new Date();
        this.$log?.debug(
          `Current date and time is <${timestampToDatetimeString(now.getTime() / 1000)}>.`,
        );
        // if phase has no end date, only check if we're after start date
        if (!phase.date_to) {
          this.$log?.debug(
            `No end date set for phase <${phaseType}>,` +
              ' checking only if current date is after' +
              ` start date <${date.getDateDiff(now, startDate, 'days') >= 0}>.`,
          );
          return date.getDateDiff(now, startDate, 'days') >= 0;
        }
        const endDate: Date = new Date(phase.date_to);
        this.$log?.debug(
          `<${phaseType}> phase date to <${timestampToDatetimeString(endDate.getTime() / 1000)}>.`,
        );
        this.$log?.debug(
          `Is challenge in phase type <${phaseType}> <${date.isBetweenDates(
            now,
            startDate,
            endDate,
            {
              inclusiveFrom: true,
              inclusiveTo: true,
              onlyDate: true,
            },
          )}>.`,
        );
        return date.isBetweenDates(now, startDate, endDate, {
          inclusiveFrom: true,
          inclusiveTo: true,
          onlyDate: true,
        });
      }
      this.$log?.debug(`No <${phaseType}> phase type found.`);
      return false;
    },
    getPhaseFromSet(phaseType: PhaseType): Phase | null {
      return (
        this.phaseSet.find((phase: Phase) => phase.phase_type === phaseType) ||
        null
      );
    },
    resetPersistentProperties(): void {
      this.phaseSet = [];
      this.daysActive = null;
      this.maxTeamMembers = null;
      this.priceLevel = [];
    },
  },

  persist: {
    omit: ['isChallengeActive'],
  },
});
