import { CoreArgs, CoreResults, TSet } from "../../src/core/core-definitions";
import { translateCore } from "../../src/core/translate-core";
import { serviceMap, TService } from "../../src/services/service-definitions";

export function injectFakeService(serviceName: string, service: TService) {
  serviceMap[serviceName as keyof typeof serviceMap] = service as never;
}

export const enSrc: TSet = new Map([
  ["one", "Content One"],
  ["two", "Content Two"],
  ["three", "Content Three"],
  ["four", "Content Four"],
  ["five", "Content Five"],
  ["six", "Content Six"],
]);

export const commonArgs: Omit<CoreArgs, "oldTarget" | "src" | "srcCache"> = {
  service: "google-translate",
  serviceConfig: "gcloud/gcloud_service_account.json",
  matcher: "icu",
  srcLng: "en",
  targetLng: "de",
};

export const deTarget: TSet = new Map([
  ["one", "Inhalt Eins"],
  ["two", "Inhalt Zwei"],
  ["three", "Inhalt Drei"],
  ["four", "Inhalt vier"],
  ["five", "Inhalt Fünf"],
  ["six", "Inhalt Sechs"],
]);

export async function translateCoreAssert(
  args: CoreArgs
): Promise<CoreResults> {
  const res = await translateCore(args);
  const changeSet = res.changeSet;
  const serviceInvocation = res.serviceInvocation;
  expect(serviceInvocation?.results.size ?? 0).toBeLessThanOrEqual(
    serviceInvocation?.inputs.size ?? 0
  );
  expect(changeSet.added.size + changeSet.updated.size).toBeLessThanOrEqual(
    serviceInvocation?.results.size ?? 0
  );
  expect(
    changeSet.added.size + changeSet.updated.size + changeSet.skipped.size
  ).toBeLessThanOrEqual(serviceInvocation?.inputs.size ?? 0);
  return res;
}
