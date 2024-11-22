import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Link, LinkProps } from "expo-router";

interface ExternalLinkProps extends Omit<LinkProps, "href"> {
  href: string;
}

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ExternalLink(props: ExternalLinkProps) {
  const { href, ...rest } = props;

  return (
    <Link
      href={href as unknown as LinkProps["href"]}
      target="_blank"
      {...rest}
      onPress={(e) => {
        if (Platform.OS !== "web" && isExternalLink(href)) {
          e.preventDefault();
          WebBrowser.openBrowserAsync(href);
        }
      }}
    />
  );
}
