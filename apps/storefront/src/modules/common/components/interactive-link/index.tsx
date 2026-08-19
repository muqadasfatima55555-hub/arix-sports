import { Text } from "@modules/common/components/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className = "",
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      href={href}
      onClick={onClick}
      className={className}
      {...props}
    >
      <Text className="!text-inherit font-inherit tracking-inherit">
        {children}
      </Text>
    </LocalizedClientLink>
  )
}

export default InteractiveLink